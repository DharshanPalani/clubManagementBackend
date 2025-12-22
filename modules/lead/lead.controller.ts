import type { Request, Response } from "express";
import { LeadService } from "./lead.service.ts";

export class LeadController {
  private leadService: LeadService;

  constructor(leadService?: LeadService) {
    this.leadService = leadService ?? new LeadService();
  }

  async registerLead(req: Request, res: Response): Promise<void> {
    try {
      const { profile_id, domain_id, club_id } = req.body;

      if (!profile_id || !domain_id || !club_id) {
        res.status(400).json({ message: "Missing required fields" });
        return;
      }

      const lead = await this.leadService.registerLead(
        profile_id,
        domain_id,
        club_id,
      );

      res.status(201).json(lead);
    } catch (error: any) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error at controller lead registration" });
    }
  }
}
