const mysql = require("mysql2/promise");
const bluebird = require("bluebird");

const { config } = require("dotenv");
const promisify = require("bluebird/js/release/promisify");
config();
// create the connection to database

async function cone() {
  const conn = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    Promise: bluebird,
  });
  
  return conn;
}

const connection = cone();

module.exports = connection;
