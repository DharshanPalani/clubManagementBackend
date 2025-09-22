import type { Request, Response } from "express";

const me = (request: any, response: Response) => {
  return response.json({ user: request.user, isAuth: true });
};
export default me;
