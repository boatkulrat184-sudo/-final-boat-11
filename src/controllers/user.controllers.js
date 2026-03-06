import { findUserById } from "../service/auth.service.js";

const SALT_ROUNDS = 10;

export async function me(req, res) {
  const user = await findUserById(req.userId);
  if (!user) {
    return res.status(404).json({ status: "error", message: "User not found" });
  }
  res.json({
    id: user.id,
    username: user.username,
  });
}
