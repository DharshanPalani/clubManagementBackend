import express from "express";
import type { RequestHandler } from "express";
// import achievementRoute from "./routes/achievementRoute.ts";
import cookieParser from "cookie-parser";
import cors from "cors";
import schemaExecutor from "./schemaExecutor.ts";
import { router as leadRoute } from "./modules/lead/lead.routes.ts";
import { router as profileRoute } from "./modules/profile/profile.routes.ts";
import { router as authRoute } from "./modules/auth/auth.routes.ts";
import { router as clubRoute } from "./modules/club/club.routes.ts";
import { router as roleRoute } from "./modules/role/role.routes.ts";
import { router as headRoute } from "./modules/head/head.routes.ts";
import { router as memberRoute } from "./modules/members/member.routes.ts";
import { router as domainRoute } from "./modules/domains/domain.routes.ts";

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
// app.use("/user", achievementRoute);
app.use("/user", profileRoute);
app.use("/user", roleRoute);
app.use("/user", domainRoute);
app.use("/user", memberRoute);
app.use("/user", clubRoute);
app.use("/user", leadRoute);
app.use("/user", headRoute);
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
