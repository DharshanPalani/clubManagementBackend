import { MembersImp } from "./MemberImp.ts";
import express from "express";

const memberRouter = express.Router();

const memberController = new MembersImp();

memberRouter.post(
  "/member/register",
  memberController.registerMember.bind(memberController)
);

export default memberRouter;
