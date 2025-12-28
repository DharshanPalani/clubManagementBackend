import pool from "../../db.ts";
import type { Role } from "./role.model.ts";

export class RoleRepository {
  async getRoleById(roleId: number): Promise<Role | null> {
    const result = await pool.query(`SELECT * FROM roles WHERE role_id = $1`, [
      roleId,
    ]);
    return result.rows[0] || null;
  }

  async createRole(roleName: string): Promise<Role> {
    const result = await pool.query(
      `INSERT INTO roles (role_name)
       VALUES ($1)
       RETURNING *`,
      [roleName],
    );
    return result.rows[0];
  }
}
