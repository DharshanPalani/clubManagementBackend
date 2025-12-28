import type { Request, Response } from "express";
import type { IRole } from "./IRole.ts";
import pool from "../../db.ts";

export class RoleImp {
  async getRole(request: Request, response: Response): Promise<void> {
    try {
      const { roleID } = request.params;

      const result = await pool.query(
        `SELECT * FROM roles WHERE role_id = $1`,
        [roleID],
      );

      response.send(result.rows[0]);
    } catch (error: any) {
      response.send(error);
    }
  }
  async addRole(request: Request, response: Response): Promise<void> {
    try {
      const { newRole } = request.body;
      const result = await pool.query(
        `INSERT INTO roles (role_name) VALUES($1) RETURNING *`,
        [newRole],
      );
      console.log(newRole);

      response.status(201).json(result.rows[0]);
    } catch (error: any) {
      response.send(error);
    }
  }
}
