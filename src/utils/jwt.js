import jwt from "jsonwebtoken";

export function generateToken(payload) {
  if (!process.env.JWT_SECRET_KEY) {
    throw new Error("JWT_SECRET_KEY is not set");
  }
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    algorithm: "HS256",
    expiresIn: "1h",
  });
  return token;
}

export function verifyToken(token) {
  if (!process.env.JWT_SECRET_KEY) {
    throw new Error("ยังไม่ได้ตั้งค่ากุญแจลับ (JWT_SECRET_KEY) ในระบบครับ");
  }
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
}
