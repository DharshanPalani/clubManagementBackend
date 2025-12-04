import type { Request, Response } from "express";
import type { IProfile } from "./IProfile";

export class ProfileImp implements IProfile {
  async updateProfile(request: Request, response: Response): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async registerProfile(request: any, response: Response): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async getProfileData(request: any, response: Response): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
