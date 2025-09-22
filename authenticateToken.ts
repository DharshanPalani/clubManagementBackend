import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import type { Request, Response, NextFunction } from "express";
dotenv.config();

const authenticateToken = (
  request: any,
  response: Response,
  next: NextFunction
) => {
  const token = request.cookies?.token;
  const secretKey: any = process.env.TOKEN_SECRET_KEY;
  if (!token) {
    return response.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    request.user = decoded;
    next();
  } catch (err) {
    return response.status(403).json({ error: "Invalid or expired token" });
  }
};

export default authenticateToken;
