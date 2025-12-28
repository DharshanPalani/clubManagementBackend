import type { Request, Response } from "express";
import { HeadService } from "./head.service.ts";

export class HeadController {
  private service = new HeadService();

  addHead = async (req: Request, res: Response): Promise<void> => {
    try {
      const { profile_id, club_id, domain_id } = req.body;
      const head = await this.service.addHead(profile_id, club_id, domain_id);
      res.status(201).json({
        message: "Added a head successfully",
        data: head,
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };
}
