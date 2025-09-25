import type { Request, Response } from "express";

const me = (request: any, response: Response) => {
  return response.json({
    user: request.user.id,
    username: request.user.username,
    isAuth: true,
  });
};
export default me;
