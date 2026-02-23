import rateLimit from "express-rate-limit";

export const chatLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: parseInt(process.env.PER_IP_REQUESTS_PER_HOUR ?? "10", 10),
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many chat requests. Try again in an hour." },
});

export const imageLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 1 day
  max: parseInt(process.env.MAX_IMAGE_SUBMISSIONS_PER_IP ?? "3", 10),
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Daily image submission limit reached." },
});
