import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import hpp from "hpp";
import router from "./routes/api.js";
import {
  MONGODB_CONNECTION,
  PORT,
  MAX_JSON_SIZE,
  URL_ENCODED,
  WEB_CACHE,
  REQUEST_LIMIT_NUMBER,
  REQUEST_LIMIT_TIME,
} from "./app/config/config.js";
/* import fileUpload from "express-fileupload"; */
import path from "path";
const _dirname = path.resolve();
const app = express();

// Global Application Middleware
const corsOption = {
  origin: "https://taskmanagement-kdq0.onrender.com",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  exposedHeaders: ["Content-Type", "Authorization", "Set-Cookie"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};
app.use(cors(corsOption));
app.use(express.json({ limit: MAX_JSON_SIZE }));
app.use(express.urlencoded({ extended: URL_ENCODED }));
app.use(hpp());
app.use(helmet());
app.use(cookieParser());

/* app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
); */

// Rate Limiter
const limiter = rateLimit({
  windowMs: REQUEST_LIMIT_TIME,
  max: REQUEST_LIMIT_NUMBER,
});
app.use(limiter);

// Web Caching
app.set("etag", WEB_CACHE);

// MongoDB connection
mongoose
  .connect(MONGODB_CONNECTION, { autoIndex: true })
  .then(() => {
    console.log("Connected to MongoDB s");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB");
  });

// Set API Routes
app.use("/api", router);

// Set Application Storage
app.use(express.static("storage"));

// Run Your Express Back End Project

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

app.use(express.static(path.join(_dirname, "/frontend/dist")));

app.get("*", (_, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});
