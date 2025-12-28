import type { Request, Response } from "express";
import { DomainService } from "./domain.service.ts";

export class DomainController {
  private service = new DomainService();

  getDomain = async (req: Request, res: Response): Promise<void> => {
    try {
      const domainID = Number(req.params.domainID);
      const domain = await this.service.getDomain(domainID);
      res.json(domain);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  };

  addDomain = async (req: Request, res: Response): Promise<void> => {
    try {
      const { newDomain } = req.body;
      const domain = await this.service.addDomain(newDomain);
      res.status(201).json(domain);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };
}
