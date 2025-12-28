import type { Request, Response } from "express";
import { AuthService } from "./auth.service.ts";

export class AuthController {
  private service = new AuthService();

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;

      const token = await this.service.login(username, password);

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
      });

      res.status(200).json({ message: "Login successful" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async register(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;

      const userId = await this.service.register(username, password);

      res.status(201).json({
        message: "Registered successfully",
        userId,
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async me(req: any, res: Response): Promise<void> {
    res.json({
      user: req.user.id,
      username: req.user.username,
      isAuth: true,
    });
  }
}
