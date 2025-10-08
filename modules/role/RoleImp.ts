import type { Request, Response } from "express";
import type { IRole } from "./IRole.ts";
import pool from "../../db.ts";
import useGetRoleWithID from "../../hooks/useGetRoleWithID.ts";
import useGetProfileWithID from "../../hooks/useGetProfileWithID.ts";

export class RoleImp implements IRole {
  async getRoleByAuth(request: any, response: Response): Promise<void> {
    try {
      const user = request.user;

      const userProfile = await useGetProfileWithID(user.id);

      const result = await useGetRoleWithID(userProfile.role_id);

      response.status(201).json(result);
    } catch(error : any) {
      response.send("Error on role auth daw " + error);
    }
  }
  async getRoleByParms(request: Request, response: Response): Promise<void> {
    try {
      const { roleID } = request.params;

      const result = await useGetRoleWithID(parseInt(roleID));

      response.status(201).json(result);
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
