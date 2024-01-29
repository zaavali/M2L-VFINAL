const mariadb = require('mariadb');
require('dotenv').config();


const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_DTB,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    port: process.env.DB_PORT,
    connectionLimit: 100, // Adjust the connection limit as needed
    acquireTimeout: 30000, // Increase the timeout value
  });

  module.exports = { pool: pool};