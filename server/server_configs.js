/*
    This is a list of variables that is used throughout the server.js file. 
    Change the variables here to get the server working with whatever the new host system is
*/

// Sever and client connection
const HOSTNAME = "http://174.138.47.229";
const SERVER_PORT = 3001;
const CLIENT_PORT = 5173;

// database information
const DB_HOSTNAME = "localhost";
const DB_USER = "487program";
const DB_PASSWORD = "greatslop3301";
const DB_NAME = "ghjotl487";

// exporting the variables to use in the server.js file
module.exports = {
    HOSTNAME, 
    SERVER_PORT, 
    CLIENT_PORT,
    DB_HOSTNAME,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
};