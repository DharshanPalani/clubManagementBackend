import express from "express";
import { DomainImp } from "../modules/domains/DomainImp.ts";
import authenticateToken from "../authenticateToken.ts";

const domainRoute = express.Router();
const domainController = new DomainImp();

domainRoute.post(
  "/domain/addDomain",
  authenticateToken,
  domainController.addDomain.bind(domainController)
);

domainRoute.get(
  "/domain/getDomain/:domainID",
  domainController.getDomain.bind(domainController)
);
export default domainRoute;
