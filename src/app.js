import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/error.middleware.js";
import ticketsRouter from "./routes/tickets.routes.js";

const confing = dotenv.config({
  path: "./.env",
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ limit: "16kb", extended: true }));

const allowedOrigins = [
  "http://localhost:5173",
  process.env.CORS_ORIGIN,
].filter(Boolean);

// CORS configuration
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type"],
  }),
);

// Routes
app.use("/api/tickets", ticketsRouter);

// Gloable Error handling
app.use(errorHandler);

export default app;
