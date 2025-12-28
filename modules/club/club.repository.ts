import pool from "../../db.ts";
import type { Club } from "./club.model.ts";

export class ClubRepository {
  async createClub(clubName: string): Promise<Club> {
    const result = await pool.query(
      `INSERT INTO clubs (club_name) VALUES ($1) RETURNING *`,
      [clubName],
    );
    return result.rows[0];
  }

  async getClubById(clubId: number): Promise<Club | null> {
    const result = await pool.query(`SELECT * FROM clubs WHERE club_id = $1`, [
      clubId,
    ]);
    return result.rows[0] || null;
  }
}
