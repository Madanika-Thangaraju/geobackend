import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const JWT_SECRET = process.env.JWT_SECRET || "geohomefinder_fallback_secret_2024";

console.log("Testing JWT with Secret:", JWT_SECRET);

const payload = { id: 1, role: "TEST" };
const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "10s" });

console.log("Generated Token:", token);

try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("✅ Verification Success:", decoded);
} catch (error) {
    console.error("❌ Verification Failed:", error.message);
    process.exit(1);
}

// Test expired token
const expiredToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "-1s" });
try {
    jwt.verify(expiredToken, JWT_SECRET);
} catch (error) {
    console.log("✅ Correctly identified expired token:", error.message);
}

// Test malformed secret
try {
    jwt.verify(token, "wrong_secret");
} catch (error) {
    console.log("✅ Correctly identified invalid signature:", error.message);
}
