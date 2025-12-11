import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import pool from "../../db.ts";

export class AuthImp {
  async login(request: Request, response: Response): Promise<void> {
    const { username, password } = request.body;

    const secretKey = process.env.TOKEN_SECRET_KEY;
    if (!secretKey) {
      response.status(500).json({ message: "Server configuration error" });
      return;
    }

    try {
      const userResult = await pool.query(
        `SELECT * FROM users WHERE username = $1`,
        [username]
      );

      if (userResult.rows.length === 0) {
        response.status(500).json({ message: "User does not exist" });
        return;
      }
      const user = userResult.rows[0];

      if (password !== user.password) {
        response.status(500).json({ message: "Invalid password" });
        return;
      }

      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
        },
        secretKey,
        { expiresIn: "10m" }
      );

      response.cookie("token", token, {
        httpOnly: true,
        secure: false,
      });

      response.status(500).send("Login successful");
    } catch (error: any) {}
  }
  async register(request: Request, response: Response): Promise<void> {
    const { username, password } = request.body;
    try {
      const isUserAvailable = await pool.query(
        `SELECT * FROM users WHERE username = $1`,
        [username]
      );
      if (isUserAvailable.rows.length > 0) {
        response.status(500).json({ message: "Username already exists" });
        return;
      }

      const result = await pool.query(
        `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id`,
        [username, password]
      );

      response
        .status(201)
        .json({ message: "Registered successfully", result: result });
    } catch (error: any) {
      response.status(500).json({ messgae: "Error", error: error });
    }
  }
  async me(request: any, response: Response): Promise<void> {
    response.json({
      user: request.user.id,
      username: request.user.username,
      isAuth: true,
    });
  }
}
