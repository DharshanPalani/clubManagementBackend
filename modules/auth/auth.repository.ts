import pool from "../../db.ts";
import type { User } from "./auth.model.ts";

export class AuthRepository {
  async findByUsername(username: string): Promise<User | null> {
    const result = await pool.query(`SELECT * FROM users WHERE username = $1`, [
      username,
    ]);
    return result.rows[0] || null;
  }

  async createUser(username: string, password: string): Promise<number> {
    const result = await pool.query(
      `INSERT INTO users (username, password)
       VALUES ($1, $2)
       RETURNING id`,
      [username, password],
    );
    return result.rows[0].id;
  }
}
