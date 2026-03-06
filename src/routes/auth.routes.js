import express from "express";
import {
  registerUser,
  registerDocter,
  loginUser,
  loginDocter,
} from "../controllers/auth.controllers.js";

const authRouter = express.Router();

authRouter.post("/register/user", registerUser);
authRouter.post("/register/docter", registerDocter);

authRouter.post("/login/user", loginUser);
authRouter.post("/login/docter", loginDocter);

export default authRouter;
