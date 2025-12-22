import { LeadRepository } from "./lead.repository.ts";

export class LeadService {
  private leadRepo: LeadRepository;

  constructor(leadRepo?: LeadRepository) {
    this.leadRepo = leadRepo ?? new LeadRepository();
  }

  async registerLead(profile_id: number, domain_id: number, club_id: number) {
    try {
      return await this.leadRepo.createLead(profile_id, domain_id, club_id);
    } catch (error: any) {
      throw new Error("Error at registering lead: " + error);
    }
  }
}
