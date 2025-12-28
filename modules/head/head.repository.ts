import pool from "../../db.ts";
import type { Head } from "./head.model.ts";

export class HeadRepository {
  async findByProfileId(profileId: number): Promise<Head | null> {
    const result = await pool.query(
      `SELECT * FROM heads WHERE profile_id = $1`,
      [profileId],
    );
    return result.rows[0] || null;
  }

  async createHead(
    profileId: number,
    clubId: number,
    domainId: number,
  ): Promise<Head> {
    const result = await pool.query(
      `
      INSERT INTO heads (profile_id, club_id, domain_id)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [profileId, clubId, domainId],
    );
    return result.rows[0];
  }
}
