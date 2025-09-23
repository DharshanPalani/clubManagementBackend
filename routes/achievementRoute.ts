import express from "express";

import { AchievementImp } from "../modules/achievements/AchievementImp.ts";
import authenticateToken from "../authenticateToken.ts";

const achievementRoute = express.Router();

const achievementController = new AchievementImp();

achievementRoute.post(
  "/achievement/post",
  authenticateToken,
  achievementController.addAchievement.bind(achievementController)
);

achievementRoute.post(
  "/achievement/get",
  achievementController.fetchAchievements.bind(achievementController)
);

export default achievementRoute;
