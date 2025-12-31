import jwt from "jsonwebtoken";
import { AuthRepository } from "./auth.repository.ts";
import { ProfileService } from "../profile/profile.service.ts";
import { profile } from "node:console";

export class AuthService {
  private repo = new AuthRepository();
  private profileService = new ProfileService();

  async login(username: string, password: string): Promise<string> {
    const secretKey = process.env.TOKEN_SECRET_KEY;
    if (!secretKey) {
      throw new Error("Server configuration error");
    }

    const user = await this.repo.findByUsername(username);
    if (!user) {
      throw new Error("User does not exist");
    }

    if (password !== user.password) {
      throw new Error("Invalid password");
    }

    const userProfile = await this.profileService.getProfile(user.id, false);

    if (!userProfile) {
      throw new Error("Error at fetching profile data");
    }

    const tokenPayload = {
      id: user.id,
      username: user.username,
      profile_id: userProfile.profile_id,
    };

    const token = jwt.sign(tokenPayload, secretKey, { expiresIn: "10m" });

    return token;
  }

  async register(username: string, password: string): Promise<number> {
    const existingUser = await this.repo.findByUsername(username);
    if (existingUser) {
      throw new Error("Username already exists");
    }

    return this.repo.createUser(username, password);
  }
}
