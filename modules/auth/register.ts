import pool from "../../db.ts";
import type { Request, Response } from "express";

const register = async (request: Request, response: Response) => {
  const { username, password } = request.body;
  try {
    const isUserAvailable = await pool.query(
      `SELECT * FROM users WHERE username = $1`,
      [username]
    );
    if (isUserAvailable.rows.length <= 0) {
      const result = await pool.query(
        `
        INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id`,
        [username, password]
      );
      // console.log(result.rows[0].id);
      // The error is that the role_id is in string so it won't work since it asks for a int so convert
      // role_id to int and then send it.
      // console.log(role_id);
      // const newProfile = await pool.query(
      //   `
      //   INSERT INTO profile (user_id, role_id) VALUES ($1, $2) RETURNING id`,
      //   [result.rows[0].id, parseInt(role_id)]
      // );
      // console.log(newProfile.rows[0].id);
    } else {
      response.send("User already exists");
    }

    response.status(201).send("Registered successfully");
  } catch (error) {
    response.status(404).send(error);
  }
};

export default register;
