import { DomainRepository } from "./domain.repository.ts";
import type { Domain } from "./domain.model.ts";

export class DomainService {
  private repo = new DomainRepository();

  async getDomain(domainId: number): Promise<Domain> {
    const domain = await this.repo.getDomainById(domainId);
    if (!domain) {
      throw new Error("Domain not found");
    }
    return domain;
  }

  async addDomain(newDomain: string): Promise<Domain> {
    if (!newDomain) {
      throw new Error("Domain name is required");
    }
    return this.repo.createDomain(newDomain);
  }
}
