import express from "express";

import login from "../modules/auth/login.ts";
import register from "../modules/auth/register.ts";
import authenticateToken from "../authenticateToken.ts";
import me from "../modules/auth/me.ts";

const authRoute = express.Router();

authRoute.post("/login", login);
authRoute.post("/register", register);
authRoute.get("/me", authenticateToken, me);

export default authRoute;
