import pool from "../../db.ts";
import type { Domain } from "./domain.model.ts";

export class DomainRepository {
  async getDomainById(domainId: number): Promise<Domain | null> {
    const result = await pool.query(
      `SELECT * FROM domains WHERE domain_id = $1`,
      [domainId],
    );
    return result.rows[0] || null;
  }

  async createDomain(domainName: string): Promise<Domain> {
    const result = await pool.query(
      `INSERT INTO domains (domain_name) VALUES ($1) RETURNING *`,
      [domainName],
    );
    return result.rows[0];
  }
}
