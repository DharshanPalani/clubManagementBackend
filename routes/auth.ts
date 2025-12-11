import express from "express";
import authenticateToken from "../authenticateToken.ts";
import { AuthImp } from "../modules/auth/AuthImp.ts";

const authRoute = express.Router();

const authController = new AuthImp();

authRoute.post("/login", authController.login.bind(authController));
authRoute.post("/register", authController.register.bind(authController));
authRoute.get("/me", authenticateToken, authController.me.bind(authController));

export default authRoute;
