import type { Request, Response } from "express";
import { MembersService } from "./member.service.ts";

export class MembersController {
  private service = new MembersService();

  registerMember = async (req: Request, res: Response): Promise<void> => {
    try {
      const { profile_id, club_id } = req.body;
      const member = await this.service.registerMember(profile_id, club_id);
      res.status(201).json(member);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };
}
