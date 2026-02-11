
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

async function fixNotificationType() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || "localhost",
            user: process.env.DB_USER || "root",
            password: process.env.DB_PASS || "",
            database: process.env.DB_NAME || "geohomefinder",
            port: process.env.DB_PORT || 3306
        });

        console.log("Connected to database. Altering notifications table...");

        const sql = `
            ALTER TABLE notifications 
            MODIFY COLUMN type ENUM('like', 'save', 'view', 'message', 'tour_accepted', 'tour_rejected', 'call_accepted', 'call_rejected') NOT NULL
        `;

        await connection.query(sql);
        console.log("✅ Successfully updated notification types ENUM.");

        await connection.end();
    } catch (err) {
        console.error("❌ Failed to update notification types:", err.message);
    }
}

fixNotificationType();
