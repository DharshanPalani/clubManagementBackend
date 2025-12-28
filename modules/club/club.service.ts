import { ClubRepository } from "./club.repository.ts";
import type { Club } from "./club.model.ts";

export class ClubService {
  private repo = new ClubRepository();

  async addClub(newClub: string): Promise<Club> {
    if (!newClub) {
      throw new Error("Club name is required");
    }

    return this.repo.createClub(newClub);
  }

  async getClub(clubId: number): Promise<Club> {
    const club = await this.repo.getClubById(clubId);
    if (!club) {
      throw new Error("Club not found");
    }
    return club;
  }
}
