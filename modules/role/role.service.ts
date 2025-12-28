import { RoleRepository } from "./role.repository.ts";
import type { Role } from "./role.model.ts";

export class RoleService {
  private repo = new RoleRepository();

  async getRole(roleId: number): Promise<Role> {
    const role = await this.repo.getRoleById(roleId);
    if (!role) {
      throw new Error("Role not found");
    }
    return role;
  }

  async addRole(newRole: string): Promise<Role> {
    if (!newRole) {
      throw new Error("Role name is required");
    }
    return this.repo.createRole(newRole);
  }
}
