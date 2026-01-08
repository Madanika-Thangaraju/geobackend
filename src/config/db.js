import mysql from "mysql2/promise";
import dbdata from "./env.js";

const db = mysql.createPool({
  host: dbdata.host,
  user: dbdata.username,
  password: dbdata.password,
  database: dbdata.db,
});

export default db;
