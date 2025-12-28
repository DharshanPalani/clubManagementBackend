// import express from "express";
// import { ProfileImp } from "../modules/profile/ProfileImp.ts";
// import authenticateToken from "../authenticateToken.ts";

// const profileRoute = express.Router();

// const profileController = new ProfileImp();

// profileRoute.get(
//   "/profile/getProfile",
//   authenticateToken,
//   profileController.getProfileData.bind(profileController)
// );

// profileRoute.post(
//   "/profile/updateProfile",
//   authenticateToken,
//   profileController.updateProfile.bind(profileController)
// );

// profileRoute.post(
//   "/profile/registerProfile",
//   authenticateToken,
//   profileController.registerProfile.bind(profileController)
// );

// export default profileRoute;
