import type { Request, Response } from "express";
import { ClubService } from "./club.service.ts";

export class ClubController {
  private service = new ClubService();

  async addClub(req: Request, res: Response) {
    try {
      const { newClub } = req.body;
      const club = await this.service.addClub(newClub);
      res.status(201).json(club);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getClub(req: Request, res: Response) {
    try {
      const clubID = Number(req.params.clubID);
      const club = await this.service.getClub(clubID);
      res.json(club);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }
}
