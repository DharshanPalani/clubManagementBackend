import type { Request, Response } from "express";

export interface IMember{
  /**
   * @param request should request the following data from the body
   * user(id)
   * domain(id)
   *
   * Then should create a entry in the members table
   *
   */
  addMember(request: Request, response: Response) : Promise<void>
}
