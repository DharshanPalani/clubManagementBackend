import type { Request, Response } from "express";
import type { IDomain } from "./IDomain.ts";
import pool from "../../db.ts";

export class DomainImp implements IDomain {
  async getDomain(request: Request, response: Response): Promise<void> {
    try {
      const { domainID } = request.params;

      const result = await pool.query(
        `
        SELECT * FROM domains WHERE domain_id = $1`,
        [domainID]
      );

      response.send(result.rows[0]);
    } catch (error: any) {
      response.send(error);
    }
  }

  async addDomain(request: Request, response: Response): Promise<void> {
    try {
      const { newDomain } = request.body;

      const result = await pool.query(
        `INSERT INTO domains (domain_name) VALUES($1) RETURNING *`,
        [newDomain]
      );

      response.send(result.rows[0]);
    } catch (error: any) {
      response.send(error);
    }
  }
}
