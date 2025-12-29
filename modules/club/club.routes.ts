import { Router } from "express";
import { ClubController } from "./club.controller.ts";
import authenticateToken from "../../authenticateToken.ts";

export const router = Router();
const controller = new ClubController();

router.post("/club", controller.addClub.bind(controller));

router.get("/club/:clubID", controller.getClub.bind(controller));
