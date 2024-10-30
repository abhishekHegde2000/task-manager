import cors from "cors";
import dotenv from "dotenv";
import type { Application, NextFunction, Request, Response } from "express";
import express from "express";

import { connectDb } from "./db";
import taskRouter from "./routes/task.routes";
import userRouter from "./routes/user.routes";

dotenv.config();

connectDb();

const app: Application = express();
const PORT = process.env.PORT ?? 3000;

app.use((_req: Request, res: Response, next: NextFunction) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    process.env.CORS_ORIGIN as string
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(
  cors({
    origin: process.env.CORS_ORIGIN as string,
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/v1/user", userRouter);

app.use("/api/v1/tasks", taskRouter);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error", success: false });
});

app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}`);
});

export default app;
