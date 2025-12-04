import type { Request, Response } from "express";
import type { IMember } from "./IMember.ts";
import pool from "../../db.ts";

export class MembersImp implements IMember {
  async addMember(request: Request, response: Response): Promise<void> {}
}
