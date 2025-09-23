import type { Request, Response } from "express";

const me = (request: any, response: Response) => {
  return response.json({ user: request.user.id, isAuth: true });
};
export default me;
