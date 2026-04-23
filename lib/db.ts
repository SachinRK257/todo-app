import mysql from "mysql2/promise";  // import MySQL library with promise support

const db = mysql.createPool({    // create database connection pool
  host: "localhost",     // database location
  user: "root",          // username
  password: "mother",    // password
  database: "tododb",    // database name
});

export default db;   // export connection to use in backend