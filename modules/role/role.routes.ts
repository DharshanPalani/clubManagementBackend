import { Router } from "express";
import { RoleController } from "./role.controller.ts";
import authenticateToken from "../../authenticateToken.ts";

export const router = Router();
const controller = new RoleController();

router.get(
  "/role/:roleID",
  authenticateToken,
  controller.getRole.bind(controller),
);

router.post("/role", authenticateToken, controller.addRole.bind(controller));
