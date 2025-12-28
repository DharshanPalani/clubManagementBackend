import { Router } from "express";
import { HeadController } from "./head.controller.ts";
import authenticateToken from "../../authenticateToken.ts";

export const router = Router();
const controller = new HeadController();

router.post("/head", authenticateToken, controller.addHead.bind(controller));
