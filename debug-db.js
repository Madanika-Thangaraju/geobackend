import dbdata from "./src/config/env.js";
import mysql from "mysql2/promise";

console.log("Debug Config:");
console.log("Host:", dbdata.host);
console.log("User:", dbdata.username);
console.log("Password length:", dbdata.password ? dbdata.password.length : 0);
console.log("DB:", dbdata.db);

async function test() {
    try {
        const connection = await mysql.createConnection({
            host: dbdata.host,
            user: dbdata.username,
            password: dbdata.password,
            database: dbdata.db
        });
        console.log("✅ Direct connection successful!");
        await connection.end();
    } catch (err) {
        console.error("❌ Direct connection failed:", err.message);
    }
}

test();
