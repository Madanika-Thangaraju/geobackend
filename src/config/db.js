import mysql from "mysql2/promise";
import dbdata from "./env.js";

console.log("DB Config in db.js:", dbdata);

const db = mysql.createPool({
  host: dbdata.host,
  user: dbdata.username,
  password: "",
  database: dbdata.db,
});

export default db;
