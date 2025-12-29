import pool from "../../db.ts";
import { Profile } from "./profile.model.ts";

export class ProfileRepository {
  async createProfile(
    user_id: number,
    club_id: number,
    role_id: number,
  ): Promise<Profile> {
    const query = `INSERT INTO profiles (user_id, club_id, role_id) VALUES($1, $2, $3) RETURNING *`;
    const checkProfileExistance = await pool.query(
      `SELECT 1 FROM profiles WHERE user_id = $1`,
      [user_id],
    );
    if (checkProfileExistance.rows.length > 0) {
      throw new Error("Profile already exits for the user ID: " + user_id);
    }
    const profile = await pool.query(query, [user_id, club_id, role_id]);

    return profile.rows[0];
  }

  async getProfileWithUserID(user_id: number): Promise<Profile> {
    const query = `SELECT * FROM profiles WHERE user_id = $1`;
    const profileData = await pool.query(query, [user_id]);

    return profileData.rows[0];
  }
}
