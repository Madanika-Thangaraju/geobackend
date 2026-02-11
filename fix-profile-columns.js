
import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

async function migrate() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS || "",
        database: process.env.DB_NAME
    });

    console.log("Migrating users table...");

    // 1. Increase image size to LONGTEXT
    await connection.query("ALTER TABLE users MODIFY COLUMN image LONGTEXT");
    console.log("✅ Increased image column size to LONGTEXT");

    // 2. Add push_enabled if missing
    const [columns] = await connection.query("DESCRIBE users");
    const columnNames = columns.map(c => c.Field);

    if (!columnNames.includes('push_enabled')) {
        await connection.query("ALTER TABLE users ADD COLUMN push_enabled BOOLEAN DEFAULT 0");
        console.log("✅ Added push_enabled column");
    }

    await connection.end();
    console.log("Migration finished.");
}

migrate().catch(console.error);
