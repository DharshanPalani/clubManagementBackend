import pool from "../../db.js";

const register = async (request, response) => {
  const { username, password } = request.body;
  try {
    const isUserAvailable = await pool.query(
      `SELECT * FROM users WHERE username = $1`,
      [username]
    );
    if (isUserAvailable.rows.length <= 0) {
      const result = await pool.query(
        `
        INSERT INTO users (username, password) VALUES ($1, $2)`,
        [username, password]
      );
    } else {
      response.send("User already exists");
    }

    response.status(201).send("Registered successfully");
  } catch (error) {
    response.status(404).send(error);
  }
};

export default register;
