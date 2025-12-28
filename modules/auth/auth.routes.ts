import { Router } from "express";
import { AuthController } from "./auth.controller.ts";
import authenticateToken from "../../authenticateToken.ts";

export const router = Router();
const controller = new AuthController();

router.post("/login", controller.login.bind(controller));

router.post("/register", controller.register.bind(controller));

router.get("/me", authenticateToken, controller.me.bind(controller));
