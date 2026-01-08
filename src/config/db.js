import mysql from "mysql2";
import dbdata from "./env.js";

const db = mysql.createPool({
  host: dbdata.host,
  user: dbdata.username,
  password: "",
  database: dbdata.db,
});

export default db;
