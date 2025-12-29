import dotenv from "dotenv";

dotenv.config();

const dbdata = {
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  db: process.env.DB_NAME
};

export default dbdata;
