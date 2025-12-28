import type { Request, Response } from "express";
import { ClubService } from "./club.service.ts";

export class ClubController {
  private service = new ClubService();

  addClub = async (req: Request, res: Response): Promise<void> => {
    try {
      const { newClub } = req.body;
      const club = await this.service.addClub(newClub);
      res.status(201).json(club);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  getClub = async (req: Request, res: Response): Promise<void> => {
    try {
      const clubID = Number(req.params.clubID);
      const club = await this.service.getClub(clubID);
      res.json(club);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  };
}
