import db from '../src/config/db.js';

const runMigration = async () => {
    try {
        console.log('Running migration: Add status column to properties table...');

        // Check if column exists first to avoid errors
        const [columns] = await db.query("SHOW COLUMNS FROM properties LIKE 'status'");

        if (columns.length === 0) {
            const sql = "ALTER TABLE properties ADD COLUMN status ENUM('active', 'sold', 'pending') DEFAULT 'active'";
            await db.query(sql);
            console.log('Successfully added status column to properties table.');
        } else {
            console.log('Column status already exists in properties table.');
        }

        process.exit(0);
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
};

runMigration();
