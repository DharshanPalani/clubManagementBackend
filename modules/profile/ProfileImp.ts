import type { Request, Response } from "express";
import type { IProfile } from "./IProfile";
import pool from "../../db.ts";

export class ProfileImp implements IProfile {
  async updateProfile(request: any, response: Response): Promise<void> {
    try {
      const user = request.user;
      const { display_name, phone_no, email, club_id, role_id } = request.body;

      const updatedProfileResult = await pool.query(
        `UPDATE profiles SET display_name = $2, phone_no = $3, email = $4, club_id = $5, role_id = $6 WHERE user_id = $1 RETURNING *`,
        [user.id, display_name, phone_no, email, club_id, role_id]
      );

      response.status(201).json(updatedProfileResult.rows[0]);
      return;
    } catch (error: any) {
      response.status(500).send(error);
    }
  }

  async registerProfile(request: any, response: Response): Promise<void> {
    try {
      const user = request.user;

      const checkProfileExistance = await pool.query(
        `SELECT * FROM profiles WHERE user_id = $1`,
        [user.id]
      );

      if (checkProfileExistance.rows.length > 0) {
        response.status(500).send("Profile already exists for this user.");
        return;
      }

      const profileResult = await pool.query(
        `INSERT INTO profiles (user_id) VALUES($1) RETURNING *`,
        [user.id]
      );

      response.status(201).send(profileResult.rows[0]);
    } catch (error: any) {
      response.status(401).send(error);
    }
  }

  async getProfileData(request: any, response: Response): Promise<void> {
    try {
      const user = request.user;

      const fetchProfileData = await pool.query(
        `SELECT * FROM profiles WHERE user_id = $1`,
        [user.id]
      );

      if (fetchProfileData.rows.length <= 0) {
        response
          .status(500)
          .send("Profile is not registered or does not exits");
        return;
      }

      response.status(201).send(fetchProfileData.rows[0]);
    } catch (error: any) {
      response.status(500).send(error);
    }
  }
}
