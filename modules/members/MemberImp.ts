import type { Request, Response } from "express";
import pool from "../../db.ts";

export class MembersImp {
  async registerMember(request: Request, response: Response): Promise<void> {
    try {
      const { profile_id, club_id } = request.body;

      if (!profile_id || !club_id) {
        response.status(400).send("profile_id and club_id are required");
        return;
      }

      const checkMemberExistance = await pool.query(
        `SELECT 1 FROM members WHERE profile_id = $1 AND club_id = $2`,
        [profile_id, club_id]
      );

      if (checkMemberExistance.rows.length > 0) {
        response.status(409).send("Member already exists in this club");
        return;
      }

      const result = await pool.query(
        `INSERT INTO members (profile_id, club_id)
         VALUES ($1, $2)
         RETURNING *`,
        [profile_id, club_id]
      );

      response.status(201).json(result.rows[0]);
    } catch (error: any) {
      console.error("Member register error:", error);
      response.status(500).send("Error registering member");
    }
  }
}
