import { Router } from "express";
import { validateContact } from "../middleware/validateContact.js";
import { verifyRecaptcha } from "../middleware/verifyRecaptcha.js";

export const contactRouter = Router();

contactRouter.post("/", validateContact, verifyRecaptcha, async (req, res) => {
  const { name, company, email, message } = req.body;

  try {
    // TODO: Configure nodemailer transport
    // const transporter = nodemailer.createTransport({
    //   host: process.env.SMTP_HOST,
    //   port: Number(process.env.SMTP_PORT),
    //   auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    // });
    //
    // await transporter.sendMail({
    //   from: process.env.SMTP_USER,
    //   to: process.env.CONTACT_TO_EMAIL,
    //   subject: `Portfolio Contact: ${name}`,
    //   text: `Name: ${name}\nCompany: ${company || "N/A"}\nEmail: ${email}\n\n${message}`,
    // });

    console.log("Contact form submission:", { name, company, email, message });
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Failed to send message" });
  }
});
