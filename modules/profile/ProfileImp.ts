import type { Request, Response } from "express";
import type { IProfile } from "./IProfile";
import pool from "../../db.ts";
import useGetProfileWithID from "../../hooks/useGetProfileWithID.ts";

export class ProfileImp implements IProfile {
  async getProfileEmailAndNumber(
    request: any,
    response: Response
  ): Promise<void> {
    try {
      const user = request.user;

      const userData = await pool.query(`SELECT * FROM users WHERE id = $1`, [
        user.id,
      ]);

      const payloadUserData = {
        email: userData.rows[0].email,
        phone: userData.rows[0].phone,
      };

      response
        .status(201)
        .json({ message: "Data fetched successfully", data: payloadUserData });
    } catch (error: any) {
      response
        .status(401)
        .json({ message: "Error at data fetching.", error: error });
    }
  }
  async updateProfileEmailAndNumber(
    request: any,
    response: Response
  ): Promise<void> {
    try {
      const user = request.user;
      const email_phone_data = request.body;

      const userData = await pool.query(
        `
          UPDATE users 
          SET 
            email = COALESCE($1, email),
            phone = COALESCE($2, phone)
          WHERE id = $3
          RETURNING id, username, email, phone`,
        [email_phone_data.email, email_phone_data.phone, user.id]
      );

      response
        .status(201)
        .json({ message: "Profile Updated", updatedData: userData.rows[0] });
    } catch (error: any) {
      response.send(error);
    }
  }
  async getProfileData(request: any, response: Response): Promise<void> {
    try {
      const user = request.user;

      const result = await useGetProfileWithID(user.id);

      response.status(201).json(result);
    } catch (error: any) {
      response.send(error);
    }
  }
  async updateProfileRole(request: any, response: Response): Promise<void> {
    try {
      const { newRole_id } = request.body;
      const user = request.user;

      const profileData = await pool.query(
        `SELECT * FROM profile WHERE user_id = $1`,
        [user.id]
      );

      if (profileData.rows.length > 0) {
        const result = await pool.query(
          `UPDATE profile SET role_id = $1 WHERE user_id = $2  RETURNING *`,
          [parseInt(newRole_id), parseInt(profileData.rows[0].id)]
        );

        response.status(201).json(result.rows[0]);
      } else {
        response.send("No profile found daw");
      }
    } catch (error: any) {
      response.status(404).send(error);
    }
  }
}
