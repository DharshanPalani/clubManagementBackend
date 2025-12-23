import express from "express";
import type { RequestHandler } from "express";
import authRoute from "./routes/auth.ts";
import achievementRoute from "./routes/achievementRoute.ts";
import cookieParser from "cookie-parser";
import cors from "cors";
import roleRoute from "./routes/roleRoute.ts";
import domainRoute from "./routes/domainRoute.ts";
import memberRouter from "./modules/members/memberRoute.ts";
import schemaExecutor from "./schemaExecutor.ts";
import clubRouter from "./routes/clubRoute.ts";
import headRoute from "./modules/head/headRoute.ts";
import { router as leadRoute } from "./modules/lead/lead.routes.ts";
import { router as profileRoute } from "./modules/profile/profile.routes.ts";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser() as RequestHandler);

schemaExecutor(true);

app.use("/auth", authRoute);
app.use("/user", achievementRoute);
app.use("/user", profileRoute);
app.use("/user", roleRoute);
app.use("/user", domainRoute);
app.use("/user", memberRouter);
app.use("/user", clubRouter);
app.use("/user", leadRoute);
app.use("/user", headRoute);
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
