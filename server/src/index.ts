import express from "express";
import cors from "cors";
import { contactRouter } from "./routes/contact.js";
import { chatRouter } from "./routes/chat.js";
import { bubblesRouter } from "./routes/bubbles.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/contact", contactRouter);
app.use("/api/chat", chatRouter);
app.use("/api/bubble", bubblesRouter);
app.use("/api/bubbles", bubblesRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
