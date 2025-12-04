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
  getRole(request: Request, response: Response): Promise<void>;
}
