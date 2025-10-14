import type { Request, Response } from "express";
import type { IDomain } from "./IDomain.ts";
import pool from "../../db.ts";

export class DomainImp implements IDomain {
  async getDomainWithLeadId(request: any, response: Response): Promise<void> {
    try {
      const user = request.user;
      const domainData = await pool.query(
        `SELECT * FROM domains WHERE lead_user_id = $1`,
        [user.id]
      )
      if(domainData.rows.length > 0) {
        response.status(201).json(domainData.rows[0]);
      } else {
        response.send("The user is not a lead");
      }

    } catch(error : any) {
    }
  }
  async getDomain(request: Request, response: Response): Promise<void> {
    try {
      const {domain_id} = request.params;
      const domainData = await pool.query(
        `SELECT * FROM domains WHERE id = $1`,
        [domain_id]
      );

      response.status(201).json(domainData.rows[0]);
    } catch(error : any) {
      response.json(error);
    }
  }
  async addDomain(request: Request, response: Response): Promise<void> {
    try {
      const { domain_name, lead_user_id } = request.body;

      const result = await pool.query(
        `INSERT INTO domains (domain_name, lead_user_id) VALUES ($1, $2) RETURNING *`,
        [domain_name, lead_user_id]
      );

      response.status(201).json(result.rows[0]);

    } catch(error : any) {
      response.json(error);
    }

  }

}


