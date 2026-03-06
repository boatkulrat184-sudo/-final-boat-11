import { prisma } from "../config/prismaClient.js";

export const createUser = async (username, hashPassword) => {
  const newUser = await prisma.user.create({
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

  console.log("user", user);

  return null;
};
