import express from "express"

import { RoleImp } from "../modules/role/RoleImp.ts"
import authenticateToken from "../authenticateToken.ts";

const roleRoute = express.Router();

const roleController = new RoleImp();

roleRoute.post("/role/addRole", authenticateToken, roleController.addRole.bind(roleController));
roleRoute.get("/role/getRole", authenticateToken, roleController.getRoleByAuth.bind(roleController));
roleRoute.get("/role/getRole/:roleID", authenticateToken, roleController.getRoleByParms.bind(roleController));
export default roleRoute;
