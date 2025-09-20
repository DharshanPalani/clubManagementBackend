import express from "express";

import login from "../modules/auth/login.js";
import register from "../modules/auth/register.js";
import authenticateToken from "../authenticateToken.js";
import me from "../modules/auth/me.js";

const authRoute = express.Router();

authRoute.post("/login", login);
authRoute.post("/register", register);
authRoute.get("/me", authenticateToken, me);

export default authRoute;
