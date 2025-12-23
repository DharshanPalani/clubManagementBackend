import pool from "../../db.ts";

export class ProfileRepository {
  async createProfile(user_id: number, club_id: number, role_id: number) {
    const query = `INSERT INTO profiles (user_id, club_id, role_id) VALUES($1, $2, $3) RETURNING *`;
    const checkProfileExistance = await pool.query(
      `SELECT 1 FROM profiles WHERE user_id = $1`,
      [user_id],
    );
    if (checkProfileExistance.rows.length > 0) {
      throw new Error("Profile already exits for the user ID: " + user_id);
    }
    const { rows } = await pool.query(query, [user_id]);

    return rows;
  }
}
