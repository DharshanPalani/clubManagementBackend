import { MembersRepository } from "./member.repository.ts";
import type { Member } from "./member.model.ts";

export class MembersService {
  private repo = new MembersRepository();

  async registerMember(profileId: number, clubId: number): Promise<Member> {
    if (!profileId || !clubId) {
      throw new Error("profile_id and club_id are required");
    }

    const existingMember = await this.repo.findByProfileAndClub(
      profileId,
      clubId,
    );
    if (existingMember) {
      throw new Error("Member already exists in this club");
    }

    return this.repo.createMember(profileId, clubId);
  }
}
