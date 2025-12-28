import pool from "../../db.ts";
import type { Member } from "./member.model.ts";

export class MembersRepository {
  async findByProfileAndClub(
    profileId: number,
    clubId: number,
  ): Promise<Member | null> {
    const result = await pool.query(
      `SELECT * FROM members WHERE profile_id = $1 AND club_id = $2`,
      [profileId, clubId],
    );
    return result.rows[0] || null;
  }

  async createMember(profileId: number, clubId: number): Promise<Member> {
    const result = await pool.query(
      `INSERT INTO members (profile_id, club_id) VALUES ($1, $2) RETURNING *`,
      [profileId, clubId],
    );
    return result.rows[0];
  }
}
