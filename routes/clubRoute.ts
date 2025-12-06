import express from "express";

import { ClubImp } from "../modules/club/ClubImp.ts";
import authenticateToken from "../authenticateToken.ts";

const clubRouter = express.Router();

const clubController = new ClubImp();

clubRouter.post(
  "/club/newClub",
  authenticateToken,
  clubController.addClub.bind(clubController)
);

clubRouter.get(
  "/club/getClub/:clubID",
  clubController.getClub.bind(clubController)
);

export default clubRouter;
