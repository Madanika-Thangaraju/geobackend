import mysql from "mysql2/promise";
import dbdata from "./src/config/env.js";

async function migrate() {
    const connection = await mysql.createConnection({
        host: dbdata.host,
        user: dbdata.username,
        password: "",
        database: dbdata.db,
    });

    console.log("Connected to DB for migration...");

    const createMessagesTable = `
    CREATE TABLE IF NOT EXISTS messages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      sender_id INT NOT NULL,
      receiver_id INT NOT NULL,
      content TEXT NOT NULL,
      type ENUM('text', 'image') DEFAULT 'text',
      is_read BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (sender_id) REFERENCES users(id),
      FOREIGN KEY (receiver_id) REFERENCES users(id)
    );
  `;

    await connection.query(createMessagesTable);
    console.log("Messages table verified/created.");

    await connection.end();
}

migrate().catch(console.error);
