// modules
import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import cors from "cors";

// constants
const PORT = process.env.PORT || 8000;

const app = express();
app.use(cors());
app.use(
  "/",
  createProxyMiddleware({
    secure: false,
    logLevel: "debug",
    target: "https://api.soundcloud.com/",
    changeOrigin: true,
  })
);

// start server
app.listen(PORT);
