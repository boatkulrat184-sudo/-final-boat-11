import express from "express";
import {
  registerUser,
  registerDocter,
} from "../controllers/auth.controllers.js";

const authRouter = express.Router();

authRouter.post("/register/user", registerUser);
authRouter.post("/register/docter", registerDocter);

export default authRouter;
