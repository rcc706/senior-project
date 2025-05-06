const express = require('express');                                 // Used to make node easier to use
const cors = require('cors');                                       // Allows cross-origin resource sharing
const mysql = require('mysql2');                                    // Allows interaction with the database
const bodyParser = require('body-parser');                          // Parsing parts of the request body
const bcrypt = require('bcrypt');                                   // Used for hashing the passwords
const { body, validationResult } = require('express-validator');    // Used for validating form data
const session = require('express-session');                         // Managing sessions

// Create instance of the server
const app = express();

// get the server configurations
const {HOSTNAME, SERVER_PORT, CLIENT_PORT, DB_HOSTNAME, DB_USER, DB_PASSWORD, DB_NAME} = require("./server_configs.js"); 

// store for the sessions (storing sessions in mysql table in the db)
const MySQLStore = require('express-mysql-session')(session);

// setting up body parser for the sever to parse json data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// allows communication between server and frontend since on diff ports
app.use(cors({
    origin: `${HOSTNAME}:${CLIENT_PORT}`,
    credentials: true
}));

// configurations for the database (for connecting)
const dbConf = {
    connectionLimit: 10,
    host: DB_HOSTNAME,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
};

// confgurations for the session store 
const storeConf = {
    connectionLimit: 10,
    host: DB_HOSTNAME,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    clearExpired: true,
    checkExpirationInterval: 1200000, 
    expiration: 1200000, 
    createDatabaseTable: true
};

// Connecting to the database and creating session store with configurations
const db = mysql.createPool(dbConf);
const sessionStore = new MySQLStore(storeConf);

// session configuration
app.use(session({
    key: 'session_cookie_name',
    secret: 'your_secret_key',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1200000
    }
}));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// using express validator to check the form data submission from the signup page
    // username: trimmed, not empty, length beween 5 and 25 characters, must be alphanumeric
    // email:    trimed,  not empty, must be an actual email
    // password: trimmed, not empty, length beween 5 and 25 characters, must be alphanumeric
    // conf password: follows same restrictions as password, must also match password

app.post('/signup', [
    body('username')
        .trim()
        .notEmpty().withMessage("Username cannot be empty")
        .isLength({ min: 5, max: 25 }).withMessage("Username length must be between 5 and 25")
        .isAlphanumeric().withMessage('Username must be alphanumeric')
        .custom(async (username) => {
            const query = "SELECT USER_NAME FROM USERS WHERE USER_NAME = ?";

            // Make a database query with the select query string and the username from the form
            const [results] = await db.promise().query(query, [username]);

            // Should only have 1 user
            if (results.length > 0) {
                throw new Error("Username is already registered")
            }
        }),
    body('email')
        .trim()
        .notEmpty().withMessage("Email cannot be empty")
        .isEmail().withMessage("Email must be a valid email")
        .custom(async (email) => {
            const query = "SELECT USER_NAME FROM USERS WHERE USER_EMAIL = ?";

            // Make a database query with the select query string and the email from the form
            const [results] = await db.promise().query(query, [email]);

            // Should only have 1 email
            if (results.length > 0) {
                throw new Error("Email is already registered")
            }
        }),
    body('password')
        .trim()
        .notEmpty().withMessage("Password cannot be empty")
        .isLength({ min: 5, max: 25 }).withMessage("Password length must be between 5 and 25")
        .isAlphanumeric().withMessage('Password must be alphanumeric'),
    body('confpassword')
        .trim()
        .notEmpty().withMessage("Repeated Password cannot be empty")
        .isLength({ min: 5, max: 25 }).withMessage("Repeated Password length must be between 5 and 25")
        .isAlphanumeric().withMessage('Repeated Password must be alphanumeric')
        .custom((confpassword, { req }) => {
            // check if the confpassword from the form is the same from the password from the form
            if (confpassword !== req.body.password) {
                throw new Error('Repeated password does not match password');
            }

            // express-validator custom functions need to return a truthy value
                // no errors, all good
            return true;
        }),
], (req, res) => {
    // Check if the validation returned any errors and send them as an array 
    // Based it off of the documentation: https://express-validator.github.io/docs/api/validation-result/#array
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({ errors: validationResult(req).array() });
    }

    // Hashing the new password an inserting username, email, and hashed password into the db
    const { username, email, password } = req.body;
    const saltRounds = 10;

    // since no errors --> insert new username, email, and hashed password into the database
        // using bcrypt to hash the password
    const insertQuery = "INSERT INTO USERS (USER_NAME, USER_EMAIL, USER_PASSWORD) VALUES (?, ?, ?)";
    bcrypt.genSalt(saltRounds, (error, salt) => {
        bcrypt.hash(password, salt, (error, hashedPassword) => {
            db.query(insertQuery, [username, email, hashedPassword]);
        });
    });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// using express validator to check the form data submission from the login page
    // username: trimmed, not empty
    // password: trimmed, not empty
    // the username and password must belong to the same user in the database

app.post('/login', [
    body('password') // check password from request body
    .trim()
    .notEmpty().withMessage("Password cant be empty"),
    body('username') // check username from request body
    .trim()
    .notEmpty().withMessage("Username cant be empty")
    .custom(async (username, { req }) => {
        const query = "SELECT USER_NAME, USER_PASSWORD, USER_EMAIL FROM USERS WHERE USER_NAME = ?";         

        // Based this code off of this link: https://stackoverflow.com/questions/49701657/using-a-db-query-as-a-promise/49701714#49701714
            // Couldn't get the async db.query to work, then the bcrypt.compare that relies on the query finishing first
            // had to wrap it all up in a promise in order to resolve them at the right time
        return new Promise((resolve, reject) => {
            db.query(query, [username], (err, results) => {
                if (results.length === 0) {
                    return reject(new Error("Username is not registered"));
                }

                // Saving resuts from the db query (hopyfully only one user)
                    // Can access the results with user.USER_(NAME|EMAIL|PASSWORD)
                const user = results[0];

                // Comparing the password from the request to the hashed password in the database
                    // if they don't match return an error
                bcrypt.compare(req.body.password, user.USER_PASSWORD, (err, matched) => {
                    if (!matched) {
                        return reject(new Error("Incorrect password"));
                    }

                    // temp storing username and email, will be moved to the session below outside of the validator 
                    req.session.user = { username: user.USER_NAME }; 
                    req.session.email = { email: user.USER_EMAIL };

                    // all is good, resolving the promise
                    resolve();
                });
            });
        });
    }),
], (req, res) => {
    // Check if the validation returned any errors and send them as an array 
    // Based it off of the documentation: https://express-validator.github.io/docs/api/validation-result/#array
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({ errors: validationResult(req).array() });
    }

    res.status(200).send('Login successful')
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// logs out the user by destroying the session 
app.post('/logout', (req, res) => {
    req.session.destroy();
    res.status(200).send('Logout successful')
});

// returns the username and email to the frontend to use on the userprofile page
    // data comes from the session that was initially stored by in the /login route
app.get('/getUserData', (req, res) => {
    const user = req.session.user;
    const email = req.session.email;
    req.session.save();
    res.json({username: user, email: email});
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Gets the names of the parties that belong to the user

app.post('/getPartyNames', async (req, res) => {
    // get validation errors and send them back as an array
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try {
        // get the user id 
        const uidQuery = "SELECT USER_ID FROM USERS WHERE USER_NAME = ?";
        const [rows1] = await db.promise().query(uidQuery, [req.body.uName]);

        // check if the user id doesn't exist 
        if (rows1.length === 0) {
            return res.status(400).json({message: "User not registered"});
        }

        // get all the party names for the parties that belong to the user  
        const pNamesQuery = "SELECT PARTYNAME FROM PARTIES WHERE PARTIES.USER_ID = ?";
        const [rows2] = await db.promise().query(pNamesQuery, [rows1[0].USER_ID]);

        // all is good, return the party names as a JSON
        return res.status(200).json(rows2);

    } catch (error) {
        // catch any server errors and send back a message
        return res.status(400).json({message: error.message});
    }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// add a party to the database

app.post('/addParty', [
    body("pName")
        .trim()
        .not().isEmpty().withMessage("Party name cant be empty")
], async (req, res) => {
    // get validation errors and send them back as an array
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try {
        // get the user id 
        const uidQuery = "SELECT USER_ID FROM USERS WHERE USER_NAME = ?";
        const [rows1] = await db.promise().query(uidQuery, [req.body.uName]);

        // check if the user id doesn't exist 
        if (rows1.length === 0) {
            return res.status(400).json({message: "User not registered"});
        }

        // get all the party names for the parties that belong to the user  
        const pNamesQuery = "SELECT PARTYNAME FROM PARTIES WHERE PARTIES.USER_ID = ? AND PARTIES.PARTYNAME = ?";
        const [rows2] = await db.promise().query(pNamesQuery, [rows1[0].USER_ID, req.body.pName]);

        // if no party names are returned, the user has no parties listed
        if (rows2.length > 0) {
            return res.status(400).json({message: "Party already exists"});
        }

        const insertPartiesQuery = "INSERT INTO PARTIES (PARTYNAME, USER_ID) VALUES (?, ?)";
        const [rows3] = await db.promise().query(insertPartiesQuery, [req.body.pName, rows1[0].USER_ID]);

        // all is good, return the party names as a JSON
        return res.status(200).send("Party added successfully");

    } catch (error) {
        // catch any server errors and send back a message
        return res.status(400).json({message: error.message});
    }

});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// add characters to a party
app.post('/addCharacter', [
    body("chName")
        .trim()
        .not().isEmpty().withMessage("Chacter name cant be empty")
        .isAlphanumeric().withMessage("Character name must be alphanumeric"),
    body("chClass")
        .not().isEmpty().withMessage("Characer class cant be empty")
], async (req, res) => {
    // get validation errors and send them back as an array
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try {
        // get the user id 
        const uidQuery = "SELECT USER_ID FROM USERS WHERE USER_NAME = ?";
        const [rows1] = await db.promise().query(uidQuery, [req.body.uName]);

        // check if the user id doesn't exist 
        if (rows1.length === 0) {
            return res.status(400).json({message: "User not registered"});
        }

        // get the party id  
        const pidQuery = "SELECT PARTY_ID FROM PARTIES WHERE PARTYNAME = ? AND PARTIES.USER_ID = ?";
        const [rows5] = await db.promise().query(pidQuery, [req.body.pName, rows1[0].USER_ID]);

        // check if the party id doesn't exist 
        if (rows5.length === 0) {
            return res.status(400).json({message: "Party does not exist"});
        }

        const dupeCharNames = "SELECT CHAR_ID FROM CHARACTERS WHERE (CHARNAME = ? OR CHARCLASS = ?) AND CHARACTERS.PARTY_ID = ?";
        const [rows2] = await db.promise().query(dupeCharNames, [req.body.chName, req.body.chClass, rows5[0].PARTY_ID]);

        if (rows2.length > 0) {
            return res.status(400).json({message: "Character with name or class already exists in the party"})
        }

        // get all the party names for the parties that belong to the user  
        const insertCharQuery = "INSERT INTO CHARACTERS (CHARNAME, CHARCLASS, PARTY_ID, TOTALXP, CHARLEVEL, GOLD) VALUES (?, ?, ?, ?, ?, ?)";
        const [rows4] = await db.promise().query(insertCharQuery, [req.body.chName, req.body.chClass, rows5[0].PARTY_ID, 0, 0, 0]);

        // all is good, 
        return res.status(200).send("Character added successfully");

    } catch (error) {
        // catch any server errors and send back a message
        return res.status(400).json({message: error.message});
    }

});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Gets the names of the characters that belong a party for a user

app.post('/getCharacterNames', [
    body("partyName")
        .trim()
        .not().isEmpty().withMessage("Party name cant be empty")
],async (req, res) => {
    // get validation errors and send them back as an array
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try {
        // get the user id 
        const uidQuery = "SELECT USER_ID FROM USERS WHERE USER_NAME = ?";
        const [rows1] = await db.promise().query(uidQuery, [req.body.uName]);

        // check if the user id doesn't exist 
        if (rows1.length === 0) {
            return res.status(400).json({message: "User not registered"});
        }

        // get the party id  
        const pidQuery = "SELECT PARTY_ID FROM PARTIES WHERE PARTYNAME = ? AND PARTIES.USER_ID = ?";
        const [rows2] = await db.promise().query(pidQuery, [req.body.partyName, rows1[0].USER_ID]);

        // check if the party id doesn't exist 
        if (rows2.length === 0) {
            return res.status(400).json({message: "Party does not exist"});
        }

        const charNamesQuery = "SELECT CHARNAME FROM CHARACTERS JOIN PARTIES ON CHARACTERS.PARTY_ID = PARTIES.PARTY_ID WHERE CHARACTERS.PARTY_ID = ? AND PARTIES.USER_ID = ?";
        const [rows3] = await db.promise().query(charNamesQuery, [rows2[0].PARTY_ID, rows1[0].USER_ID]);

        // check if the party id doesn't exist 
        if (rows3.length === 0) {
            return res.status(400).json({message: "Party has no characters"});
        }

        // all is good, return the party names as a JSON
        return res.status(200).json(rows3);

    } catch (error) {
        // catch any server errors and send back a message
        return res.status(400).json({message: error.message});
    }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Gets the names of the sscenarios that belong to the party

app.post('/getScenarios', async (req, res) => {
    try {

        // get the user id 
        const uidQuery = "SELECT USER_ID FROM USERS WHERE USER_NAME = ?";
        const [rows1] = await db.promise().query(uidQuery, [req.body.uName]);

        // check if the user id doesn't exist 
        if (rows1.length === 0) {
            return res.status(400).json({message: "User not registered"});
        }
        
        // get the party id  
        const pidQuery = "SELECT PARTY_ID FROM PARTIES WHERE PARTYNAME = ? AND PARTIES.USER_ID = ?";
        const [rows2] = await db.promise().query(pidQuery, [req.body.partyName, rows1[0].USER_ID]);

        // check if the party id doesn't exist 
        if (rows2.length === 0) {
            return res.status(400).json({message: "Party does not exist"});
        }

        const charNamesQuery = "SELECT SCENNAME FROM SCENARIOS NATURAL JOIN PARTIES_SCENARIOS WHERE PARTIES_SCENARIOS.PARTY_ID = ?";
        const [rows3] = await db.promise().query(charNamesQuery, [rows2[0].PARTY_ID]);

        // all is good, return the party names as a JSON
        return res.status(200).json(rows3);

    } catch (error) {
        // catch any server errors and send back a message
        return res.status(400).json({message: error.message});
    }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// add a scenario to the db
app.post('/addScenario', [
    body("scenName")
        .not().isEmpty().withMessage("Scenario must be selencted to add to party")
], async (req, res) => {
    // get validation errors and send them back as an array
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try {

        // get the user id 
        const uidQuery = "SELECT USER_ID FROM USERS WHERE USER_NAME = ?";
        const [rows1] = await db.promise().query(uidQuery, [req.body.uName]);

        // check if the user id doesn't exist 
        if (rows1.length === 0) {
            return res.status(400).json({message: "User not registered"});
        }

        const sidQuery = "SELECT SCEN_ID FROM SCENARIOS WHERE SCENNAME = ?";
        const [rows4] = await db.promise().query(sidQuery, [req.body.scenName]);

        // check if the user id doesn't exist 
        if (rows4.length === 0) {
            return res.status(400).json({message: "Invalid scenario option"});
        }

        // get the party id  
        const pidQuery = "SELECT PARTY_ID FROM PARTIES WHERE PARTYNAME = ? AND PARTIES.USER_ID = ?";
        const [rows2] = await db.promise().query(pidQuery, [req.body.partyName, rows1[0].USER_ID]);

        // check if the party id doesn't exist 
        if (rows2.length === 0) {
            return res.status(400).json({message: "Party does not exist"});
        }

        try {
            const insertScen = "INSERT INTO PARTIES_SCENARIOS VALUES (?, ?)";
            const [rows3] = await db.promise().query(insertScen, [rows2[0].PARTY_ID, rows4[0].SCEN_ID]);    
        } catch (inserterror) {
            return res.status(400).json({message: "Scenario already completed in this party"});
        }


        // all is good, return the party names as a JSON
        return res.status(200).send("Added successfully!");

    } catch (error) {
        // catch any server errors and send back a message
        return res.status(400).json({message: "Sever error!"});
    }

});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// update the passed in party name (must still be unique)
app.post('/updatePartyName', [
    body("pName")
        .trim()
        .not().isEmpty().withMessage("Party name cant be empty")
        .custom((formPartyName, { req }) => {
            // check if the confpassword from the form is the same from the password from the form
            if (formPartyName === req.body.currPName) {
                throw new Error('New party name cant be same as current party name');
            }

            // need to include this return true, otherwise express-validator will throw default error message --> "invalid value" (not helpful!)
                // some info here: https://express-validator.github.io/docs/6.14.0/custom-error-messages/#custom-validator-level
            return true;
        })
], async (req, res) => {
    // get validation errors and send them back as an array
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try {
        // get the user id 
        const uidQuery = "SELECT USER_ID FROM USERS WHERE USER_NAME = ?";
        const [rows1] = await db.promise().query(uidQuery, [req.body.uName]);

        // check if the user id doesn't exist 
        if (rows1.length === 0) {
            return res.status(400).json({message: "User not registered"});
        }

        // get the party id  
        const pidQuery = "SELECT PARTY_ID FROM PARTIES WHERE PARTYNAME = ? AND PARTIES.USER_ID = ?";
        const [rows2] = await db.promise().query(pidQuery, [req.body.currPName, rows1[0].USER_ID]);

        // check if the party id doesn't exist 
        if (rows2.length === 0) {
            return res.status(400).json({message: "Could not find current party id"});
        }

        // check if the new party name already exists in the users' parties
        const dupePartyQuery = "SELECT PARTYNAME FROM PARTIES WHERE PARTYNAME = ? AND PARTIES.USER_ID = ?";
        const [rows3] = await db.promise().query(dupePartyQuery, [req.body.pName, rows1[0].USER_ID]);

        if (rows3.length !== 0) {
            return res.status(400).json({message: "Party name is already used"});
        }

        try {
            const updatePNQuery = "UPDATE PARTIES SET PARTYNAME = ? WHERE PARTY_ID = ?";
            const [rows4] = await db.promise().query(updatePNQuery, [req.body.pName, rows2[0].PARTY_ID]);    
        } catch (updateError) {
            return res.status(400).json({message: "Couldn't update party"});
        }

    } catch (error) {
        // catch any server errors and send back a message
        return res.status(400).json({message: "Sever error!"});
    }

});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// get character data for a party

app.post('/getCharacters', async (req, res) => {

    try {
        // get the user id 
        const uidQuery = "SELECT USER_ID FROM USERS WHERE USER_NAME = ?";
        const [rows1] = await db.promise().query(uidQuery, [req.body.uName]);

        // check if the user id doesn't exist 
        if (rows1.length === 0) {
            return res.status(400).json({message: "User not registered"});
        }

        // get the party id  
        const pidQuery = "SELECT PARTY_ID FROM PARTIES WHERE PARTYNAME = ? AND PARTIES.USER_ID = ?";
        const [rows2] = await db.promise().query(pidQuery, [req.body.partyName, rows1[0].USER_ID]);

        // check if the party id doesn't exist 
        if (rows2.length === 0) {
            return res.status(400).json({message: "Party does not exist"});
        }

        const charNamesQuery = "SELECT CHARNAME, TOTALXP, CHARLEVEL, GOLD, CHARCLASS FROM CHARACTERS WHERE CHARACTERS.PARTY_ID = ?";
        const [rows3] = await db.promise().query(charNamesQuery, [rows2[0].PARTY_ID]);

        // all is good, return the party names as a JSON
        return res.status(200).json(rows3);

    } catch (error) {
        // catch any server errors and send back a message
        return res.status(400).json({message: error.message});
    }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// get items for the character
app.post('/getItems', async (req, res) => {
    try {

        // get the user id 
        const uidQuery = "SELECT USER_ID FROM USERS WHERE USER_NAME = ?";
        const [rows1] = await db.promise().query(uidQuery, [req.body.username]);

        // check if the user id doesn't exist 
        if (rows1.length === 0) {
            return res.status(400).json({message: "User not registered"});
        }
        
        // get the party id  
        const pidQuery = "SELECT PARTY_ID FROM PARTIES WHERE PARTYNAME = ? AND PARTIES.USER_ID = ?";
        const [rows2] = await db.promise().query(pidQuery, [req.body.partyName, rows1[0].USER_ID]);

        // check if the party id doesn't exist 
        if (rows2.length === 0) {
            return res.status(400).json({message: "Party does not exist"});
        }

        const cidQuery = "SELECT CHAR_ID FROM CHARACTERS WHERE CHARNAME = ? AND CHARACTERS.PARTY_ID = ?";
        const [rows3] = await db.promise().query(cidQuery, [req.body.charName, rows2[0].PARTY_ID]);

        // check if the character id doesn't exist 
        if (rows3.length === 0) {
            return res.status(400).json({message: "Character does not exist in party"});
        }

        const charItems = "SELECT ITEMTYPE, ITEMNAME FROM CHARACTERS_ITEMS NATURAL JOIN ITEMS WHERE CHAR_ID = ?";
        const [rows4] = await db.promise().query(charItems, [rows3[0].CHAR_ID]);


        // all is good, return the party names as a JSON
        return res.status(200).json(rows4);

    } catch (error) {
        // catch any server errors and send back a message
        return res.status(400).json({message: error.message});
    }

});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// update the character
app.post('/updateCharacter', async (req, res) => {
    try {
        // get the user id 
        const uidQuery = "SELECT USER_ID FROM USERS WHERE USER_NAME = ?";
        const [users] = await db.promise().query(uidQuery, [req.body.uName]);

        // check if the user id doesn't exist 
        if (users.length === 0) {
            return res.status(400).json({message: "User not registered"});
        }

        // get the party id  
        const pidQuery = "SELECT PARTY_ID FROM PARTIES WHERE PARTYNAME = ? and PARTIES.USER_ID = ?";
        const [parties] = await db.promise().query(pidQuery, [req.body.partyName, users[0].USER_ID]);

        // check if the party id doesn't exist 
        if (parties.length === 0) {
            return res.status(400).json({message: "Party does not exist"});
        }

        const cidQuery = "SELECT CHAR_ID FROM CHARACTERS WHERE CHARNAME = ? AND CHARACTERS.PARTY_ID = ?";
        const [chars] = await db.promise().query(cidQuery, [req.body.charName, parties[0].PARTY_ID]);

        // check if the character id doesn't exist 
        if (chars.length === 0) {
            return res.status(400).json({message: "Character does not exist in party"});
        }

        try {
            if (req.body.level) {
                const updateLevelQuery = "UPDATE CHARACTERS SET CHARLEVEL = ? WHERE PARTY_ID = ? AND CHAR_ID = ?";
                const [lvl] = await db.promise().query(updateLevelQuery, [req.body.level, parties[0].PARTY_ID, chars[0].CHAR_ID]);    
            }
    
            if (req.body.experience) {
                const updateExperienceQuery = "UPDATE CHARACTERS SET TOTALXP = ? WHERE PARTY_ID = ? AND CHAR_ID = ?";
                const [exp] = await db.promise().query(updateExperienceQuery, [req.body.experience, parties[0].PARTY_ID, chars[0].CHAR_ID]);    
            }
    
            if (req.body.gold) {
                const updateGoldQuery = "UPDATE CHARACTERS SET GOLD = ? WHERE PARTY_ID = ? AND CHAR_ID = ?";
                const [gld] = await db.promise().query(updateGoldQuery, [req.body.gold, parties[0].PARTY_ID, chars[0].CHAR_ID]);    
            }    
        } catch (error) {
            return res.status(400).json({message: "Could not update character stats"});
        }

        try {
            if (req.body.headitem) {
                // get item id
                const itemIdQuery = "SELECT ITEM_ID FROM ITEMS WHERE ITEMNAME = ?";
                const [itemid] = await db.promise().query(itemIdQuery, [req.body.headitem]);

                // if character doesn't have a head item, insert, else, update
                const charItemQuery = "SELECT ITEM_ID, ITEMTYPE FROM CHARACTERS_ITEMS NATURAL JOIN ITEMS WHERE CHAR_ID = ? AND ITEMTYPE = ?"
                const [chritem] = await db.promise().query(charItemQuery, [chars[0].CHAR_ID, "head"]);    

                if (chritem.length === 0) {
                    const insertHeadQuery = "INSERT INTO CHARACTERS_ITEMS VALUES (?, ?)";
                    const [inHead] = await db.promise().query(insertHeadQuery, [chars[0].CHAR_ID, itemid[0].ITEM_ID]);       
                } else {
                    const updateHeadQuery = "UPDATE CHARACTERS_ITEMS SET ITEM_ID = ? WHERE CHAR_ID = ?";
                    const [upHead] = await db.promise().query(updateHeadQuery, [itemid[0].ITEM_ID, chars[0].CHAR_ID]); 
                }
            }   
            
            if (req.body.chestitem) {
                // get item id
                const itemIdQuery = "SELECT ITEM_ID FROM ITEMS WHERE ITEMNAME = ?";
                const [itemid] = await db.promise().query(itemIdQuery, [req.body.chestitem]);

                // if character doesn't have a head item, insert, else, update
                const charItemQuery = "SELECT ITEM_ID, ITEMTYPE FROM CHARACTERS_ITEMS NATURAL JOIN ITEMS WHERE CHAR_ID = ? AND ITEMTYPE = ?"
                const [chritem] = await db.promise().query(charItemQuery, [chars[0].CHAR_ID, "chest"]);    

                if (chritem.length === 0) {
                    const insertHeadQuery = "INSERT INTO CHARACTERS_ITEMS VALUES (?, ?)";
                    const [inHead] = await db.promise().query(insertHeadQuery, [chars[0].CHAR_ID, itemid[0].ITEM_ID]);       
                } else {
                    const updateHeadQuery = "UPDATE CHARACTERS_ITEMS SET ITEM_ID = ? WHERE CHAR_ID = ?";
                    const [upHead] = await db.promise().query(updateHeadQuery, [itemid[0].ITEM_ID, chars[0].CHAR_ID]); 
                }
            }   

            if (req.body.onehandeditem) {
                // get item id
                const itemIdQuery = "SELECT ITEM_ID FROM ITEMS WHERE ITEMNAME = ?";
                const [itemid] = await db.promise().query(itemIdQuery, [req.body.onehandeditem]);

                // if character doesn't have a head item, insert, else, update
                const charItemQuery = "SELECT ITEM_ID, ITEMTYPE FROM CHARACTERS_ITEMS NATURAL JOIN ITEMS WHERE CHAR_ID = ? AND ITEMTYPE = ?"
                const [chritem] = await db.promise().query(charItemQuery, [chars[0].CHAR_ID, "1 hand"]);    

                if (chritem.length === 0) {
                    const insertHeadQuery = "INSERT INTO CHARACTERS_ITEMS VALUES (?, ?)";
                    const [inHead] = await db.promise().query(insertHeadQuery, [chars[0].CHAR_ID, itemid[0].ITEM_ID]);       
                } else {
                    const updateHeadQuery = "UPDATE CHARACTERS_ITEMS SET ITEM_ID = ? WHERE CHAR_ID = ?";
                    const [upHead] = await db.promise().query(updateHeadQuery, [itemid[0].ITEM_ID, chars[0].CHAR_ID]); 
                }
            }   

            if (req.body.feetitem) {
                // get item id
                const itemIdQuery = "SELECT ITEM_ID FROM ITEMS WHERE ITEMNAME = ?";
                const [itemid] = await db.promise().query(itemIdQuery, [req.body.feetitem]);

                // if character doesn't have a head item, insert, else, update
                const charItemQuery = "SELECT ITEM_ID, ITEMTYPE FROM CHARACTERS_ITEMS NATURAL JOIN ITEMS WHERE CHAR_ID = ? AND ITEMTYPE = ?"
                const [chritem] = await db.promise().query(charItemQuery, [chars[0].CHAR_ID, "legs"]);    

                if (chritem.length === 0) {
                    const insertHeadQuery = "INSERT INTO CHARACTERS_ITEMS VALUES (?, ?)";
                    const [inHead] = await db.promise().query(insertHeadQuery, [chars[0].CHAR_ID, itemid[0].ITEM_ID]);       
                } else {
                    const updateHeadQuery = "UPDATE CHARACTERS_ITEMS SET ITEM_ID = ? WHERE CHAR_ID = ?";
                    const [upHead] = await db.promise().query(updateHeadQuery, [itemid[0].ITEM_ID, chars[0].CHAR_ID]); 
                }
            }   
        } catch (error) {
            return res.status(400).json({message: error.message});
            // return res.status(400).json({message: "Could not update character items"});
        }

        return res.status(200).send("OKAY from updateCharacters");
    } catch (error) {
        // catch any server errors and send back a message
        return res.status(400).json({message: error.message});
    }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Server is listening on the port specified in the server_configs.js file
app.listen(SERVER_PORT, () => {
    console.log(`Server running at http://${HOSTNAME}:${SERVER_PORT}`);
});