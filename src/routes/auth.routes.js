import express from "express";
import {
  registerUser,
  registerDocter,
  login,
} from "../controllers/auth.controllers.js";

const authRouter = express.Router();

authRouter.post("/register/user", registerUser);
authRouter.post("/register/docter", registerDocter);

authRouter.post("/login/user", login);

export default authRouter;
