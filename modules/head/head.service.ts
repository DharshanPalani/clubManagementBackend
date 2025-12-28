import { HeadRepository } from "./head.repository.ts";
import type { Head } from "./head.model.ts";

export class HeadService {
  private repo = new HeadRepository();

  async addHead(
    profileId: number,
    clubId: number,
    domainId: number,
  ): Promise<Head> {
    const existingHead = await this.repo.findByProfileId(profileId);
    if (existingHead) {
      throw new Error("Head already exists with the same profile ID");
    }

    return this.repo.createHead(profileId, clubId, domainId);
  }
}
