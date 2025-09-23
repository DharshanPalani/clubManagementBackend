import type { Response } from "express";
import type { IAchievement } from "./IAchievement.ts";
import pool from "../../db.ts";
import { resolve } from "path";

export class AchievementImp implements IAchievement {
  async addAchievement(request: any, response: Response): Promise<void> {
    try {
      const { instagram_post_url, title, description } = request.body;
      const user_id = request.user.id;

      const result = await pool.query(
        `INSERT INTO achievements (user_id, instagram_post_url, title, description)
        VALUES ($1, $2, $3, $4) RETURNING *`,
        [user_id, instagram_post_url, title, description]
      );

      response.status(201).json({ achievement: result.rows[0] });
    } catch (error) {
      response.status(500).json({ err: "Internal Server Error", error });
    }
  }

  async fetchAchievements(request: any, response: Response): Promise<void> {
    try {
      // const { key } = request.body;
      // if (key !== "1234") {
      //   response.status(401).json({ err: "Unauthorized request" });
      //   return;
      // }
      const result = await pool.query(
        `SELECT id, instagram_post_url, title, description FROM achievements`
      );

      response.status(201).json(result.rows);
    } catch (error) {
      response.status(500).json({ err: "Internal Server Error", error });
    }
  }
}
