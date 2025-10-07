import type { Request, Response } from "express";
import { IProfile } from "./IProfile";
import pool from "../../db";

export class ProfileImp implements IProfile {
  async updateProfileRole(request: Request, response: Response): Promise<void> {
    try {
      const {profile_id, newRole_id} = request.body;
      
      const result = await pool.query(`UPDATE profile SET role_id = $1 WHERE id = $2  RETURNING *`, [newRole_id, profile_id]);

      response.status(201).json(result)
      
    } catch (error: any) {
      response.status(404).send(error);
    }
  }
}
