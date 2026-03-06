import { prisma } from "../config/prismaClient.js";
import bcrypt from "bcrypt";

export const createUser = async (username, hashPassword) => {
  const newUser = await prisma.user.create({
    data: {
      username,
      password: hashPassword,
    },
  });
  return newUser;
};

export const createDocter = async (username, hashPassword) => {
  console.log("เข้า createDocter");
  console.log(username, hashPassword);
  const newUser = await prisma.docter.create({
    data: {
      username,
      password: hashPassword,
    },
  });
  return newUser;
};

export const findUser = async (username) => {
  const user = await prisma.user.findUnique({
    where: { username },
  });
  return user;
};

export const findDocter = async (username) => {
  const user = await prisma.docter.findUnique({
    where: { username },
  });
  return user;
};

export async function verifyUser(username, password) {
  const user = await findUser(username);
  if (!user) return null;
  const isMatch = await bcrypt.compare(password, user.password);
  return isMatch ? user : null;
}
