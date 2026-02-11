
import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

async function check() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS || "",
        database: process.env.DB_NAME
    });
    const [rows] = await connection.query("DESCRIBE users");
    console.log(JSON.stringify(rows, null, 2));
    await connection.end();
}
check();
