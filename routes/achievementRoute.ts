import express from "express";

import { AchievementImp } from "../modules/achievements/AchievementImp.ts";

const achievementRoute = express.Router();

const achievementController = new AchievementImp();

achievementRoute.post(
  "/achievement/post",
  achievementController.addAchievement.bind(achievementController)
);

export default achievementRoute;
