import express from "express";

import { HeadImp } from "./HeadImp.ts";
import authenticateToken from "../../authenticateToken.ts";

const headRoute = express.Router();

const headController = new HeadImp();

headRoute.post(
  "/head/register",
  authenticateToken,
  headController.addHead.bind(headController),
);

export default headRoute;
