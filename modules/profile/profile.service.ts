import { ProfileRepository } from "./profile.repository.ts";

export class ProfileService {
  private profileRepo: ProfileRepository;
  constructor(profileRepo?: ProfileRepository) {
    this.profileRepo = profileRepo ?? new ProfileRepository();
  }

  async registerProfile(user_id: number, club_id: number, role_id: number) {
    try {
      return await this.profileRepo.createProfile(user_id, club_id, role_id);
    } catch (error: any) {
      throw new Error("Error at profile services: " + error);
    }
  }
}
