import type { Response } from "express";

export interface IAchievement {
  addAchievement(request: any, response: Response): Promise<void>;
}
