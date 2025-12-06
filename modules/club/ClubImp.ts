import type { Request, Response } from "express";
import type { IClub } from "./IClub.ts";
import pool from "../../db.ts";

export class ClubImp implements IClub {
  async addClub(request: Request, response: Response): Promise<void> {
    try {
      const { newClub } = request.body;

      const result = await pool.query(
        `INSERT INTO clubs (club_name) VALUES($1) RETURNING *`,
        [newClub]
      );

      response.send(result.rows[0]);
    } catch (error: any) {
      response.send(error);
    }
  }

  async getClub(request: Request, response: Response): Promise<void> {
    try {
      const { clubID } = request.params;

      const result = await pool.query(
        `SELECT * FROM clubs WHERE club_id = $1`,
        [clubID]
      );

      response.send(result.rows[0]);
    } catch (error: any) {
      response.send(error);
    }
  }
}
