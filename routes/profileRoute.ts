import express from "express";
import { ProfileImp } from "../modules/profile/ProfileImp.ts";
import authenticateToken from "../authenticateToken.ts";

const profileRoute = express.Router();

const profileController = new ProfileImp();

profileRoute.post(
  "/profile/updateRole",
  authenticateToken,
  profileController.updateProfileRole.bind(profileController)
);

profileRoute.get(
  "/profile/getData",
  authenticateToken,
  profileController.getProfileData.bind(profileController)
);

export default profileRoute;
