import type { Request, Response } from "express";
import pool from "../../db.ts";

export class LeadImp {
  async registerLead(request: Request, response: Response): Promise<void> {
    try {
      const { profile_id, domain_id, club_id } = request.body;

      const existingLead = await pool.query(
        `SELECT 1 FROM leads WHERE club_id = $1 AND domain_id = $2`,
        [club_id, domain_id]
      );

      if (existingLead.rows.length > 0) {
        response
          .status(409)
          .send(`A lead already exists for this domain in the club`);
        return;
      }

      const result = await pool.query(
        `INSERT INTO leads (profile_id, domain_id, club_id)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [profile_id, domain_id, club_id]
      );

      response.status(201).send(result.rows[0]);
    } catch (error) {
      response.status(500).send("Error at lead register");
    }
  }
}
