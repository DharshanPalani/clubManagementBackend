import type { Request, Response } from "express";

export interface IAchievement {
  addAchievement(request: Request, response: Response): Promise<void>;
}
