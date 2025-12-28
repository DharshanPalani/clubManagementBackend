import { ProfileService } from "./profile.service.ts";
import type { Response } from "express";
export class ProfileController {
  private profileService: ProfileService;
  constructor(profileService?: ProfileService) {
    this.profileService = profileService ?? new ProfileService();
  }

  async registerProfile(request: any, response: Response) {
    try {
      const { user_id } = request.user;
      const { club_id, role_id } = request.body;
      if (!user_id) {
        response.status(400).json({ message: "necessary data is not given" });
        return;
      }
      const profile = await this.profileService.registerProfile(
        user_id,
        club_id,
        role_id,
      );

      response
        .status(201)
        .json({ message: "Profile registered successfully", data: profile });
    } catch (error) {
      response
        .status(501)
        .send("Error at profile controller registerProfile: " + error);
    }
  }
}
