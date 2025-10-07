import type { Request, Response } from "express";

export interface IRole {
  /** 
   *  This function adds a new role to the dataBase entry.
   *  The request body should contain the following values
   *    roleName
   *  This function should return the inserted one if succeed
   *  @param request 
   *  @param response 
   * */
  addRole(request : Request, response : Response) : Promise<void>;
}
