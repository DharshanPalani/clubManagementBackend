import { Router } from "express";
import { ProfileController } from "./profile.controller.ts";
import authenticateToken from "../../authenticateToken.ts";

export const router = Router();
const controller = new ProfileController();

router.post(
  "/profile/register",
  authenticateToken,
  controller.registerProfile.bind(controller),
);
