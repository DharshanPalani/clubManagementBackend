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

  /** 
   * This function returns the specified role
   * The parms has the :id and the request is used to get that
   * Select from the roles table and return on success
   * */

  getRole(request : Request, response : Response) : Promise<void>;

}
