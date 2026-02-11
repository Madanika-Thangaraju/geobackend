import http from "http";
import app from "./src/app.js";

const PORT = 3000;

const server = http.createServer(app);

// Global error handlers to prevent silent crashes
process.on('uncaughtException', (err) => {
  console.error('🔥 UNCAUGHT EXCEPTION:', err.message);
  console.error(err.stack);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('🔥 UNHANDLED REJECTION at:', promise, 'reason:', reason);
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
