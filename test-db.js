import dotenv from "dotenv";
import mysql from "mysql2/promise";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

async function listTables() {
    try {
        const connection = await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "geohomefinder",
        });

        console.log("✅ Connection successful!");

        const [tables] = await connection.query("SHOW TABLES");
        console.log("\n--- TABLES ---");
        console.table(tables);

        for (const tableRow of tables) {
            const tableName = Object.values(tableRow)[0];
            const [columns] = await connection.query(`DESCRIBE ${tableName}`);
            console.log(`\n--- ${tableName} COLUMNS ---`);
            console.table(columns);
        }

        await connection.end();
    } catch (err) {
        console.error("❌ Error:", err.message);
    }
}

listTables();
