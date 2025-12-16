import express from "express";

import { LeadImp } from "./LeadImp.ts";
import authenticateToken from "../../authenticateToken.ts";

const leadRoute = express.Router();

const leadController = new LeadImp();

leadRoute.post(
  "/lead/register",
  authenticateToken,
  leadController.registerLead.bind(leadController)
);

export default leadRoute;
