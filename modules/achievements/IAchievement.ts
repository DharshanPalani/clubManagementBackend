import type { Response } from "express";

export interface IAchievement {
  /**
   * This function adds a new achievement in the database.
   * The request object should contain the following data in its body:
   * - instagram_post_url: string
   * - title: string
   * - description: string
   * Provides the status code for the desired situation.
   * The user ID is extracted from the user object attached to the request.
   *
   * @param request
   * @param response
   */
  addAchievement(request: any, response: Response): Promise<void>;

  /**
   * This function fetches all achievements stored in the database and returns the following:
   * - id: int
   * - instagram_post_url : string
   * - title: string
   * - description: string
   * This function won't return anything other than the required data.
   * Provides the status code for the desired situation.
   * -
   * @param request
   * @param response
   */
  fetchAchievements(request: any, response: Response): Promise<void>;
}
