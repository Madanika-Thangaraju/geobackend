
import dotenv from "dotenv";
import mysql from "mysql2/promise";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

async function migrate() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || "localhost",
            user: process.env.DB_USER || "root",
            password: process.env.DB_PASS || "",
            database: process.env.DB_NAME || "geohomefinder",
            port: process.env.DB_PORT || 3306
        });

        console.log(`Connected to database: ${process.env.DB_NAME}`);

        const queries = [
            // Owners Table
            `CREATE TABLE IF NOT EXISTS owners (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                name VARCHAR(100),
                location VARCHAR(255),
                member_since TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                whatsapp VARCHAR(20),
                call_phone VARCHAR(20),
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )`,

            // Property Likes Table
            `CREATE TABLE IF NOT EXISTS property_likes (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                property_id INT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE KEY unique_like (user_id, property_id),
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
            )`,

            // Saved Properties Table
            `CREATE TABLE IF NOT EXISTS saved_properties (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                property_id INT NOT NULL,
                notes TEXT,
                saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE KEY unique_save (user_id, property_id),
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
            )`,

            // Recently Viewed Properties Table
            `CREATE TABLE IF NOT EXISTS recently_viewed_properties (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                property_id INT NOT NULL,
                ip_address VARCHAR(45),
                session_id VARCHAR(255),
                last_viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                UNIQUE KEY unique_view (user_id, property_id),
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
            )`,

            // Notifications Table
            `CREATE TABLE IF NOT EXISTS notifications (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                sender_id INT,
                property_id INT,
                type ENUM('message', 'like', 'save', 'view', 'tour_accepted', 'tour_rejected', 'call_accepted', 'call_rejected') NOT NULL,
                content TEXT,
                is_read BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE SET NULL,
                FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE SET NULL
            )`
        ];

        for (const query of queries) {
            await connection.query(query);
            console.log("Executed query successfully.");
        }

        console.log("Migration complete.");
        await connection.end();
    } catch (err) {
        console.error("Migration failed:", err);
    }
}

migrate();
