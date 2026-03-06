import {
  findUser,
  createUser,
  createDocter,
  findDocter,
  verifyUser,
} from "../service/auth.service.js";
import { generateToken } from "../utils/jwt.js";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export async function registerUser(req, res) {
  const { username, password } = req.body;
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

//++++++++++++++++++สมัคร docter++++++++++++++++++++++++++++++++++++
export async function registerDocter(req, res) {
  const { username, password } = req.body;
  // 1. ตรวจสอบข้อมูลว่าง
  if (!username || !password) {
    return res.status(400).json({
      status: "error",
      message: "กรุณากรอกชื่อผู้ใช้ และรหัสผ่านให้ครบถ้วนครับ",
    });
  }

  try {
    // 2. ตรวจuser ซ่ำ
    const existingUser = await findDocter(username);
    console.log("ตรวจส่วนซ่ำ");
    if (existingUser) {
      return res.status(409).json({
        status: "error",
        message: "ชื่อนี้ถูกใช้งานไปแล้วครับ",
      });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = await createDocter(username, hashedPassword);

    // 3. ส่งข้อความสำเร็จ
    res.status(201).json({
      message: "สมัครสมาชิกเรียบร้อยแล้วครับ!",
      user: {
        id: newUser.id,
        username: newUser.username,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "เกิดข้อผิดพลาสครับ" });
  }
}

// login user
export async function login(req, res, next) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      status: "error",
      message: "กรุณากรอกชื่อเเละรหัสให้ครบถ้วน",
    });
  }
  try {
    const user = await verifyUser(username, password);
    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "ชื่อเเละรหัสผ่านไม่ถูกต้อง",
      });
    }
    const accessToken = generateToken({
      id: user.id,
      username: user.username,
    });
    res.json({ accessToken });
  } catch (error) {
    next(error);
  }
}
