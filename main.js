import express from "express";
import pool from "./db.js";
import authRoute from "./routes/auth.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());

app.use(cookieParser());

pool.query(
  `CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )`
);

// pool.query(`DROP TABLE achievements`);

pool.query(
  `CREATE TABLE IF NOT EXISTS achievements(
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    instagram_post_url TEXT,
    title TEXT,
    description TEXT
  )`
);

app.get("/", () => {
  console.log("Someone hit here");
});

app.use("/auth", authRoute);

app.listen(3000, () => {
  console.log("Server running");
});
