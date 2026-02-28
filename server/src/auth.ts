import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { config } from "./config.js";

type JwtPayload = {
  userId: string;
};

export function createToken(userId: string): string {
  return jwt.sign({ userId }, config.jwtSecret, { expiresIn: "7d" });
}

export type AuthenticatedRequest = Request & {
  userId?: string;
};

export function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  const authorization = req.header("authorization");
  if (!authorization?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token ausente." });
  }

  const token = authorization.slice(7);

  try {
    const payload = jwt.verify(token, config.jwtSecret) as JwtPayload;
    req.userId = payload.userId;
    return next();
  } catch {
    return res.status(401).json({ message: "Token inválido." });
  }
}
