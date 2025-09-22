import { Request, Response } from "express";
import { IAchievement } from "./IAchievement";

export class AchievementImp implements IAchievement {
  async addAchievement(request: Request, response: Response) {
    throw new Error("Method not implemented.");
  }
}
