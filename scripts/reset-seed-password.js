import db from "../src/config/db.js";
import bcrypt from "bcryptjs";

async function resetPassword() {
    try {
        const email = 'seed_owner@example.com';
        const newPassword = '123456';
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const [result] = await db.query(
            "UPDATE users SET password = ? WHERE email = ?",
            [hashedPassword, email]
        );

        if (result.affectedRows > 0) {
            console.log(`✅ Password for ${email} updated successfully.`);
            console.log(`🔑 New Password: ${newPassword}`);
        } else {
            console.log(`❌ User ${email} not found.`);
        }

        process.exit(0);
    } catch (err) {
        console.error("❌ Failed to reset password:", err);
        process.exit(1);
    }
}

resetPassword();
