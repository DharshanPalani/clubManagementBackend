import type { Request, Response } from "express";

export interface IClub {
  addClub(request: Request, response: Response): Promise<void>;
  getClub(request: Request, response: Response): Promise<void>;
}
