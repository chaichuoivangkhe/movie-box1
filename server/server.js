import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import mongoose from "mongoose";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";
import showRouter from "./routes/showRoutes.js";
import { use } from "react";
import bookingRouter from "./routes/bookingRoutes.js";
// Mount admin API routes
import adminRouter from "./routes/adminRoutes.js";
import userRouter from "./routes/userRoutes.js";
import paymentRouter from "./routes/payment.momo.js";
const app = express();
const port = 3000;

await connectDB();

//Middleware
app.use(cors());
app.use(express.json());
// Use Clerk in production; bypass in local dev to avoid hanging auth during setup
if (process.env.CLERK_DEV_ALLOW_ALL === "true") {
  app.use((req, _res, next) => {
    req.auth = () => ({ userId: "dev-user" });
    next();
  });
  console.log("[auth] Clerk dev bypass ENABLED (CLERK_DEV_ALLOW_ALL=true)");
} else {
  app.use(clerkMiddleware());
  console.log(
    "[auth] Clerk middleware ENABLED (set CLERK_DEV_ALLOW_ALL=true to bypass in local dev)"
  );
}

//Api routes
app.get("/", (req, res) => {
  res.send("Server is live");
});
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/admin", adminRouter);
app.use("/api/show", showRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/user", userRouter);
app.use("/api/payment", paymentRouter);

// DB status healthcheck
app.get("/db-status", (req, res) => {
  const states = [
    "disconnected",
    "connected",
    "connecting",
    "disconnecting",
    "unauthorized",
    "uninitialized",
  ];
  const state = mongoose.connection.readyState;
  res.json({
    success: true,
    state,
    stateText: states[state] || String(state),
    hasUri: Boolean(process.env.MONGODB_URI),
    dbName: process.env.MONGODB_DB || "moviebox",
  });
});

app.listen(port, () =>
  console.log(`Server is running at http://localhost:${port}`)
);
