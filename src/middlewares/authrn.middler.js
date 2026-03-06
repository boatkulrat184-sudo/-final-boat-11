import { verifyToken } from "../utils/jwt.js";

export function authCheck(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "กรุณาเข้าสู่ระบบก่อนใช้งานส่วนนี้ครับ",
    });
  }
  const [scheme, token] = authHeader.split(" ");
  if (scheme !== "Bearer" || !token) {
    return res
      .status(401)
      .json({ message: "รูปแบบการยืนยันตัวตนไม่ถูกต้องครับ" });
  }
  try {
    const payload = verifyToken(token);
    req.userId = payload.id;
    req.userName = payload.username;
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ message: "คุณไม่มีสิทธิ์เข้าถึง หรือโทเคนหมดอายุแล้วครับ" });
  }
}
