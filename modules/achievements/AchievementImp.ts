import type { Request, Response } from "express";
import type { IAchievement } from "./IAchievement.ts";

export class AchievementImp implements IAchievement {
  addAchievement(request: Request, response: Response): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
