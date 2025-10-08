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
  async updateProfileRole(request: any, response: Response): Promise<void> {
    try {
      const { newRole_id } = request.body;
      const user = request.user;

      const profileData = await pool.query(
        `SELECT * FROM profile WHERE id = $1`,
        [user.id]
      );

      if(profileData.rows.length > 0) {
        const result = await pool.query(
          `UPDATE profile SET role_id = $1 WHERE id = $2  RETURNING *`,
          [parseInt(newRole_id), parseInt(profileData.rows[0].id)]
        );

        response.status(201).json(result.rows[0]);
      } else {
        response.send("No profile found daw");

    } catch (error: any) {
      response.status(404).send(error);
    }
  }
}
