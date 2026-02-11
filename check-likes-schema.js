
import dotenv from "dotenv";
import mysql from "mysql2/promise";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

async function checkSchema() {
    try {
        const connection = await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "geohomefinder",
            port: 3306
        });

        const tables = ["property_likes", "saved_properties", "owners"];
        for (const t of tables) {
            console.log(`\n--- ${t} ---`);
            try {
                const [columns] = await connection.query(`DESCRIBE ${t}`);
                console.table(columns);
            } catch (e) {
                console.log(`Error describing ${t}: ${e.message}`);
            }
        }
        await connection.end();
    } catch (err) {
        console.error(err);
    }
}

checkSchema();
