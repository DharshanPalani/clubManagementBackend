import type { Request, Response } from "express";
import type { IProfile } from "./IProfile";
import pool from "../../db.ts";

export class ProfileImp implements IProfile {
  async getProfileData(request: any, response: Response): Promise<void> {
    try {
      const user = request.user;
      const result = await pool.query(
        `SELECT * FROM profile WHERE id = $1`,
        [user.id]
      )
      response.status(201).json(result.rows[0]);
    } catch(error : any) {
      response.send(error);
    }
  }
  async updateProfileRole(request: Request, response: Response): Promise<void> {
    try {
      const { profile_id, newRole_id } = request.body;

      const result = await pool.query(
        `UPDATE profile SET role_id = $1 WHERE id = $2  RETURNING *`,
        [parseInt(newRole_id), parseInt(profile_id)]
      );

      response.status(201).json(result.rows[0]);
    } catch (error: any) {
      response.status(404).send(error);
    }
  }
}
