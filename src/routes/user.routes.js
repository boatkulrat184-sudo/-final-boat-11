import express from "express";
import { me } from "../controllers/user.controllers.js";
import { authCheck } from "../middlewares/authrn.middler.js";

const userRoutes = express.Router();

userRoutes.get("/me", authCheck, me);

export default userRoutes;
