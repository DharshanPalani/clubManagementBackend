import type { Request, Response } from "express";
import type { IDomain } from "./IDomain.ts";
import pool from "../../db.ts";

export class DomainImp implements IDomain {
  async getDomain(request: Request, response: Response): Promise<void> {}
  async addDomain(request: Request, response: Response): Promise<void> {}
}
