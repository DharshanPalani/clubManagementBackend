import type { Request, Response } from "express";

export interface IDomain {
  /**
  * This function should create new entry in the domains table
  * @param request - body should contain domain_name along with lead_user_id.
  * Then the function should return it on successful entry created
  */
  addDomain(request : Request, response : Response) : Promise<void>

  /** 
  * This function should return the domain data like it's name and the lead id with the parms id
  * */
  getDomain(request : Request, response : Response) : Promise<void>

  /**
  * This function should return domain data with the lead ID
  * @param request should contain user data from the authenticateToken middlewhere
  * User ID in that request should be used to search the domain where the lead is associated
  */
  getDomainWithLeadId(request : any, response : Response) : Promise<void>
}
