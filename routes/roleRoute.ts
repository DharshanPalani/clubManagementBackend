import express from "express"

import { RoleImp } from "../modules/role/RoleImp.ts"
import authenticateToken from "../authenticateToken.ts";

const roleRoute = express.Router();

const roleController = new RoleImp();

roleRoute.post("/role/addRole", authenticateToken, roleController.addRole.bind(roleController));

export default roleRoute;
