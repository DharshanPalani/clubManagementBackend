import { Router } from "express";
import { DomainController } from "./domain.controller.ts";
import authenticateToken from "../../authenticateToken.ts";

export const router = Router();
const controller = new DomainController();

router.get(
  "/domain/:domainID",
  authenticateToken,
  controller.getDomain.bind(controller),
);

router.post(
  "/domain",
  authenticateToken,
  controller.addDomain.bind(controller),
);
