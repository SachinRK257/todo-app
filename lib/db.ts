// this file connects our app to mysql database
import mysql from "mysql2/promise";

// creating a connection pool — reuses connections for better performance
const db = mysql.createPool({
  host: process.env.DB_HOST,         // database server location
  user: process.env.DB_USER,         // database username
  password: process.env.DB_PASSWORD, // database password
  database: process.env.DB_NAME,     // database name
});

export default db;