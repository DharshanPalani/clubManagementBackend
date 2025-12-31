import type { Request, Response } from "express";
import { AuthService } from "./auth.service.ts";
import { ProfileService } from "../profile/profile.service.ts";

export class AuthController {
  private service = new AuthService();
  private profileService = new ProfileService();

  async login(req: Request, res: Response) {
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

  async register(req: Request, res: Response) {
    try {
      const { username, password, club_id, role_id } = req.body;

      const userId: any = await this.service.register(username, password);

      console.log(userId);
      console.log(club_id);
      console.log(role_id);

      if (!userId) {
        return;
      }
      const profile = await this.profileService.registerProfile(
        userId,
        club_id,
        role_id,
      );

      res.status(201).json({
        message: "Registered successfully and profile",
        userId,
        profile,
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async me(req: any, res: Response) {
    res.json({
      username: req.user.username,
      profile_id: req.user.profile,
      isAuth: true,
    });
  }
}
