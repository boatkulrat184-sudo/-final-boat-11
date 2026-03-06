import { findUser, createUser } from "../service/auth.service.js";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export async function register(req, res) {
  const { username, password } = req.body;
  console.log(username, password);

  // 1. ตรวจสอบข้อมูลว่าง
  if (!username || !password) {
    return res.status(400).json({
      status: "error",
      message: "กรุณากรอกชื่อผู้ใช้ และรหัสผ่านให้ครบถ้วนครับ",
    });
  }

  try {
    // 2. ตรวจuser ซ่ำ
    const existingUser = await findUser(username);
    if (existingUser) {
      return res.status(409).json({
        status: "error",
        message: "ชื่อนี้ถูกใช้งานไปแล้วครับ",
      });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = await createUser(username, hashedPassword);

    // 3. ส่งข้อความสำเร็จ
    res.status(201).json({
      message: "สมัครสมาชิกเรียบร้อยแล้วครับ!",
      user: {
        id: newUser.id,
        username: newUser.username,
      },
    });
  } catch (error) {}
}
