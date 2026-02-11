import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

console.log("Debug Config from .env:");
console.log("Host:", process.env.DB_HOST);
console.log("User:", process.env.DB_USER);
console.log("Password length:", process.env.DB_PASS ? process.env.DB_PASS.length : 0);
console.log("DB:", process.env.DB_NAME);

async function test() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS || "",
            database: process.env.DB_NAME
        });
        console.log("✅ Direct connection successful!");
        await connection.end();
    } catch (err) {
        console.error("❌ Direct connection failed:", err.message);
    }
}

test();
