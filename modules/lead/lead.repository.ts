import pool from "../../db.ts";

export class LeadRepository {
  async createLead(profile_id: number, domain_id: number, club_id: number) {
    const query = `INSERT INTO leads (profile_id, domain_id, club_id) VALUES($1, $2, $3) RETURNING *`;
    const { rows } = await pool.query(query, [profile_id, domain_id, club_id]);

    return rows[0];
  }
}
