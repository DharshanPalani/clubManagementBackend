import type { Request, Response } from "express";
import type { IRole } from "./IRole.ts";
import pool from "../../db.ts";

export class RoleImp implements IRole {
  async getRole(request: Request, response: Response): Promise<void> {
    try {
      const { roleID } = request.params;
      const result = await pool.query(
      `SELECT * FROM roles WHERE id = $1`,
      [roleID]
      )

      response.status(201).json(result.rows[0]);
    } catch(error : any) {
      response.send("Error daw " + error); 
    }
  }
  async addRole(request: Request, response: Response): Promise<void> {
    try {
      const { newRole } = request.body;
      const result = await pool.query(
        `INSERT INTO roles (role) VALUES($1) RETURNING *`,
        [newRole]
      );

      response.status(201).json(result.rows[0]);
    } catch (error: any) {
      response.send(error);
    }
  }
}
