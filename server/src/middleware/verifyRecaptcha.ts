import type { Request, Response, NextFunction } from "express";

const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY;
const SCORE_THRESHOLD = 0.5;

export async function verifyRecaptcha(req: Request, res: Response, next: NextFunction) {
  const { recaptchaToken } = req.body;

  if (!recaptchaToken) {
    res.status(400).json({ error: "reCAPTCHA token missing" });
    return;
  }

  if (!RECAPTCHA_SECRET) {
    console.error("RECAPTCHA_SECRET_KEY not configured");
    res.status(500).json({ error: "Server misconfigured" });
    return;
  }

  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: RECAPTCHA_SECRET,
        response: recaptchaToken,
      }),
    });

    const data = await response.json();

    if (!data.success || data.score < SCORE_THRESHOLD) {
      console.warn("reCAPTCHA failed:", { score: data.score, action: data.action });
      res.status(403).json({ error: "reCAPTCHA verification failed" });
      return;
    }

    next();
  } catch (err) {
    console.error("reCAPTCHA verify error:", err);
    res.status(500).json({ error: "reCAPTCHA verification error" });
  }
}
