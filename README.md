# Gloomhave Game Assist - CSCI 487: Senior Project

## Abstract

Gloomhaven is a complex and cooperative board game in which up to four players control characters that progress through a story of different scenarios. This project has two purposes: To aid players with managing their different parties that include the characters if they play multiple Gloomhaven sessions at once and tracking the conditions, health and experience, and other statistics regarding in-game characters and enemies. The methods to attempt to achieve those purposes were to implement a relational database to store the data for the users, parties, characters, items, and scenarios so that users could login/sign up to the website application, create/view/update/delete the parties and characters. Overall, this project fell short of the original purposes by only allowing users to login/sign up and to track just the enemy conditions and statistics without having the other tables implemented with the relational database.

## Dependencies 

### Dependencies Purpose
This section will guide users how to successfully set up their own instance of the Gloomhaven Game Assist website application. This section will focus on all the necessary instructions to install the correct software, set up the database, and configure the settings needed to get the Gloomhaven Game Assist website application working properly on the desired system. 

## Dependencies and Software
Below is a list of all the software and dependencies for this application with eachhaving their own versions.
- General Dependencies and OS: 
  - Ubuntu Server 24.04 LTS
  - Git 2.43.0
  - MySQL 8.0.41
  - Node 22.14.0
  - Npm 10.9.2
- Client Dependencies:
  - Axios 1.8.4
  - Cors 2.8.5
  - Html-react-parser 5.2.3
  - React 19.0.0
  - React-dom 19.0.0
  - React-draggable 4.4.6
  - React-router-dom 7.4.1
  - Vite 6.2.0
- Server Dependencies:
  - Bcrypt 5.1.1
  - Body-parser 2.2.0
  - Cors 2.8.5
  - Ejs 3.1.10
  - Express 5.1.0
  - Express-mysql-session 3.0.3
  - Express-session 1.18.1
  - Express-validator 7.2.1
  - Mysql2 3.14.0
  - Pm2 6.0.5
  - Nodemon 3.1.9

## Operating System
The operating system for the current version of this application is Linux Ubuntu 24.04. All of the instructions throughout the “Dependencies” section are written with that operating system in mind, so if a different operating system is in use for hosting an individual instance of this application, then some of these instructions may not apply.

## Downloading Code
Since this applications’ code can be downloaded from GitHub, users can clone the GitHub repository of this code to have it on their system. To download Git, go to this link and follow the instructions for your system: https://git-scm.com/downloads

You can verify that you have Git by running the following command in your
terminal: `git --version`.

To download the code to your current directory, run the following command:
`git clone https://github.com/rcc706/senior-project.git`

The project repository should be called senior-project that contains two directories: server and client.

## Installing MySQL and Setting up Database
This application uses MySQL as the database (refer to software list at start of Dependencies section). To install MySQL you can go to this link and follow the instructions for your system:
https://dev.mysql.com/doc/refman/8.0/en/installing.html

You can check the version of MySQL on your system with the following
command: `mysql –version`

## Creating the Database
After you’ve installed MySQL on your system, you can go into MySQL by typing
in the command `mysql` or `sudo mysql` if you need privileges. To create a
database (while running mysql), type: `CREATE DATABASE databasename;`
where databasename is the name of your database. You can check if the database was properly created by running the command: `SHOW DATABASES;`

## Creating Tables and Records
Exit MySQL by typing: ‘exit’ in your terminal. Then, change into the `server`
directory. There, go back into MySQL and type: `use databasename;` where
databasename is the name of your created database. Then, type `source
database.sql` to create the database tables. Then, type `source records.sql` to fill in the Items and Scenarios database tables.

## Creating MySQL User
In order for the application to interact with the database, a MySQL user must be created that has the correct privileges that the application needs. Go into MySQL (type `mysql`) and type the command to create a user: `CREATE USER 'user_name'@'host_name' IDENTIFIED BY 'password';` where `user_name` is the name of the user, `host_name` is the name of the host for the database (usually localhost), and `password` is the password for that user.

## Granting MySQL User Privileges
After successfully creating the MySQL user, type in the following command to
grant permissions to the user: `GRANT ALL PRIVILEGES ON databasename.*
TO user_name@'host_name';` where `databasename` is the name of the database
created earlier, `user_name` is the name of the MySQL user created earlier, and `host_name` is the name of the database host. Type: `exit` to exit MySQL.

## Installing Node.js, npm, and Nodemon
This application uses Node.js to run JavaScript on the system instead of just in the browser. To install Node.js you can go to this link and follow the instructions for your system: https://nodejs.org/en/download

Nodemon can be downloaded globally by running the command: `npm install -g
nodemon`. More information at the link: https://www.npmjs.com/package/nodemon

You can check the version of Node.js on your system with the following command: `node -v`

You can check the version of npm on your system with the following command:
`npm -v`

You can check the version of nodemon on your system with the following
command: `npm -v` 

## Installing Server Dependencies
To install all the necessary server dependencies, change the directory into the server directory and run the following command: `npm install`

## Installing Client Dependencies
To install all the necessary server dependencies, change the directory into the server directory and run the following command: `npm install`

## Set Server Configurations
To set the configurations for the server, change the directory into the server directory. Open the file called `server_configs.js` and change the following variables to these values:
- HOSTNAME : The host of the application `http://ADDRESS`
- SERVER_PORT: Port of the server.
- CLIENT_PORT: Port of the client (given by Vite when running client)
- DB_HOSTNAME: Host of the database (usually “localhost”)
- DB_USER: The user the program uses to interact with the database (The
user created in the sections above).
- DB_PASSWORD: The password of the database (The database created in
the sections above).
- DB_NAME: The name of the database (The database created in the sections
above).
Save the file and close it.

## Starting the Server
The server is started by running the command: `npm run devstart` inside the server directory with `devstart` being a script that runs `nodemon server.js` where server.js is the name of the server file.

## Set Client Environment Variable and Address
To set the environment variable for the client, change the directory into the client directory. Open the file called `.env` and change the following variable to the address with the port number of the server:
- VITE_SERVER_URL : http://{ADDRESS}:{SERVER_PORT}
- Replace {ADDRESS} with the web address for the application on the
system.
- Replace {SERVER_PORT} with the port of the server.
- Do not put the URL value in single-quotes or double quotes.
Save and close the `.env` file. Open the `package.json` file and change the line (under the “scripts” section):
- “dev”: "vite --host " to “dev”: “vite –host ADDRESS”
- ADDRESS is the address of the website (used in previous sections).

## Starting the Client
The client is started by running the command: `npm run dev` inside the client
directory with `dev` being a script that runs `vite –host ADDRESS` where
`ADDRESS` is the address set in the previous section.
Once both the server and client are running at the same time, copy the url (with port number) from the terminal instance in the client directory and paste it into a browser. The landing page should be opened in the browser (refer to “Use” section for site functionality and navigation”).
