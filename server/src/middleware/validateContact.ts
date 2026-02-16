import type { Request, Response, NextFunction } from "express";

export function validateContact(req: Request, res: Response, next: NextFunction) {
  const { name, email, message } = req.body;
  const errors: string[] = [];

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    errors.push("Name is required");
  }
  if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("Valid email is required");
  }
  if (!message || typeof message !== "string" || message.trim().length === 0) {
    errors.push("Message is required");
  }

  if (errors.length > 0) {
    res.status(400).json({ errors });
    return;
  }

  next();
}
