import type { Request, Response } from "express";
import { RoleService } from "./role.service.ts";

export class RoleController {
  private service = new RoleService();

  getRole = async (req: Request, res: Response): Promise<void> => {
    try {
      const roleID = Number(req.params.roleID);
      const role = await this.service.getRole(roleID);
      res.json(role);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  };

  addRole = async (req: Request, res: Response): Promise<void> => {
    try {
      const { newRole } = req.body;
      const role = await this.service.addRole(newRole);
      res.status(201).json(role);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };
}
