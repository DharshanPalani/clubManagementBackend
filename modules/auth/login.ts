import pool from "../../db.ts";
import jwt from "jsonwebtoken";
import type { Request, Response } from "express";

const login = async (request: Request, response: Response) => {
  const { username, password } = request.body;

  const secretKey = process.env.TOKEN_SECRET_KEY;
  if (!secretKey) {
    return response.status(500).send("Server configuration error");
  }

  try {
    const userResult = await pool.query(
      `SELECT * FROM users WHERE username = $1`,
      [username]
    );

    if (userResult.rows.length === 0) {
      return response.status(404).send("User does not exist");
    }

    const user = userResult.rows[0];

    if (password !== user.password) {
      return response.status(401).send("Wrong password");
    }

    const profileResult = await pool.query(
      `SELECT * FROM profile WHERE user_id = $1`,
      [user.id]
    );

    let profileId;
    if (profileResult.rows.length === 0) {
      console.log("Creating new profile entry");
      const insertProfile = await pool.query(
        `INSERT INTO profile (user_id, role_id) VALUES ($1, $2) RETURNING *`,
        [user.id, 1]
      );
      profileId = insertProfile.rows[0].id;
    } else {
      profileId = profileResult.rows[0].id;
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        profile_id: profileId,
      },
      secretKey,
      { expiresIn: "10m" }
    );

    response.cookie("token", token, {
      httpOnly: true,
      secure: false,
    });

    return response.send(`Welcome ${username}, profile id is ${profileId}`);
  } catch (error) {
    console.error(error);
    return response.status(500).send("Server error");
  }
};

export default login;
