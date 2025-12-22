import { Router } from "express";
import { LeadController } from "./lead.controller.ts";
import authenticateToken from "../../authenticateToken.ts";

export const router = Router();
const controller = new LeadController();

router.post(
  "/lead/register",
  authenticateToken,
  controller.registerLead.bind(controller),
);
