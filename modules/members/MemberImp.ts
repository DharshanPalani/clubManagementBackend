import type { Request, Response } from "express";
import type { IMember } from "./IMember.ts";
import pool from "../../db.ts";


export class MembersImp implements IMember {
  async addMember(request: Request, response: Response): Promise<void> {
    const { member_id, domain_id } = request.body;
    try {
      const result = await pool.query(
        `INSERT INTO members (member_id , domain_id ) VALUES ($1, $2) RETURNING *`,
        [member_id, domain_id]
      );

      response.status(201).json(result.rows[0]);

    } catch(error : any) {
      response.json(error);
    }
  }

}
