import { MembersImp } from "../modules/members/MemberImp.ts";
import express from "express"

const memberRouter = express.Router();

const memberController = new MembersImp();

memberRouter.post("/member/addMember", memberController.addMember.bind(memberController));

export default memberRouter;


