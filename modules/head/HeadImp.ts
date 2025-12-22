import type { Request, Response } from "express";
import pool from "../../db.ts";

export class HeadImp {
  async addHead(request: Request, response: Response): Promise<void> {
    try {
      const { profile_id, club_id, domain_id } = request.body;

      const checkHeadExistance = await pool.query(
        `SELECT 1 FROM profiles WHERE profile_id = $1`,
        [profile_id],
      );

      if (checkHeadExistance.rows.length > 0) {
        response.status(500).json({
          message: "Head already exits with the same profile ID",
          data: checkHeadExistance.rows[0],
        });
        return;
      }

      const result = await pool.query(
        `
          INSERT INTO heads (profile_id, club_id, domain_id) VALUES($1, $2, $3) RETURNING *`,
        [profile_id, club_id, domain_id],
      );

      response
        .status(201)
        .json({ message: "Added a head successfully", data: result.rows[0] });
    } catch (error: any) {
      response.status(501).send(error);
    }
  }
}
