import type { Request, Response } from "express";

export interface IProfile {
  /**
   * This function is used to update a user's profile role.
   * The request object should contain the following in the body
   *  profile_id
   *  newRole
   * The function should then get them, and alter that row in the profile table.
   * @param request
   * @param response
   */
  updateProfileRole(request: Request, response: Response): Promise<void>;
}
