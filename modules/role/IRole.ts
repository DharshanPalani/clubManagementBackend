import type { Request, Response } from "express";

export interface IRole {
  /** 
   * Adds a new role entry to the database.
   * 
   * The request body must contain:
   * - `roleName`: string — the name of the role to create.
   * 
   * On success, this function returns the newly inserted role record.
   * 
   * @param request Express request object containing role data in `body`.
   * @param response Express response object used to send the result or error.
   */
  addRole(request: Request, response: Response): Promise<void>;

  /** 
   * Retrieves a specific role by its ID from request parameters.
   * 
   * This function is typically used for **admin** or **testing** purposes.
   * It reads the `:id` parameter from the request URL, queries the `roles` table,
   * and returns the corresponding role record if found.
   * 
   * Example route: `GET /roles/:id`
   * 
   * @param request Express request object containing `params.id` (role ID).
   * @param response Express response object used to send the role or an error.
   */
  getRoleByParms(request: Request, response: Response): Promise<void>;

  /**
  * Retrieves the authenticated user’s role using their profile_id from the JWT token.
  *
  * This function is used in normal app flow (non-admin usage).  
  * It extracts the JWT token from the request (e.g., cookies or headers),
  * verifies it, and then fetches the user’s profile using `profile_id` from the token.
  * Finally, it retrieves the role corresponding to the profile’s `role_id`.
  *
  * Key points to remember:
  * - Do NOT use `user.id` here — always use `profile_id` from the token.
  * - This ensures the role reflects the latest value in the database,
  *   even if it was updated after login.
  *
  * Example route: `GET /roles`  
  * Requires a valid JWT token with `profile_id`.
  *
  * @param request Express request object containing JWT token (decoded or raw).
  * @param response Express response object used to send the role or an error.
  */

  getRoleByAuth(request: any, response: Response): Promise<void>;
}

