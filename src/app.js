import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { errorHander } from "./middlewares/error.middleware.js";

const confing = dotenv.config({
  path: "./.env",
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ limit: "16kb", extended: true }));

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type"],
  }),
);

// Gloable Error handling
app.use(errorHander);

export default app;
