import { Router } from "express";
import { MembersController } from "./member.controller.ts";
import authenticateToken from "../../authenticateToken.ts";

export const router = Router();
const controller = new MembersController();

router.post("/member/register", authenticateToken, controller.registerMember);
