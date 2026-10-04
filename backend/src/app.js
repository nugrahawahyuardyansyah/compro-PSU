import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { env } from "./config/env.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import apiRouter from "./routes/api.js";

const app = express();

app.disable("x-powered-by");
app.use(helmet());
app.use(
  cors({
    origin(origin, callback) {
      callback(null, !origin || origin === env.FRONTEND_ORIGIN);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json({ limit: "256kb" }));
app.use(cookieParser());

app.get("/api/health", (request, response) => {
  response.json({ status: "ok" });
});
app.use("/api", apiRouter);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
