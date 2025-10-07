import express from "express";
import pool from "./db.ts";
import type { RequestHandler } from "express";
import authRoute from "./routes/auth.ts";
import achievementRoute from "./routes/achievementRoute.ts";
import profileRoute from "./routes/profileRoute.ts";
import cookieParser from "cookie-parser";
import cors from "cors";
import roleRoute from "./routes/roleRoute.ts";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser() as RequestHandler);

await pool.query(
  `CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      )`
);

// await pool.query(`DROP TABLE achievements`);

await pool.query(
  `CREATE TABLE IF NOT EXISTS achievements(
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        instagram_post_url TEXT,
        title TEXT,
        description TEXT
      )`
);

await pool.query(
  `CREATE TABLE IF NOT EXISTS roles(
        id SERIAL PRIMARY KEY,
        role TEXT NOT NULL
      )`
);

// await pool.query(`DROP TABLE profile`);

await pool.query(
  `CREATE TABLE IF NOT EXISTS profile(
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        role_id INT NOT NULL
      )`
);

app.use("/auth", authRoute);
app.use("/user", achievementRoute);
app.use("/user", profileRoute);
app.use("/user", roleRoute);
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
