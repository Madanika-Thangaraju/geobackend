import db from "../config/db.js";

export const getOwnerByUserId = async (userId) => {
  const [[owner]] = await db.query(
    "SELECT * FROM owners WHERE user_id = ?",
    [userId]
  );
  return owner;
};
