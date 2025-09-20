import pool from "../../db.js";
import jwt from "jsonwebtoken";

const login = async (request, response) => {
  const { username, password } = request.body;
  try {
    const userExist = await pool.query(
      `SELECT * FROM users WHERE username = $1`,
      [username]
    );
    if (userExist.rows.length > 0) {
      if (password === userExist.rows[0].password) {
        const token = jwt.sign(
          {
            id: userExist.rows[0].id,
            username: userExist.rows[0].username,
          },
          process.env.TOKEN_SECRET_KEY,
          { expiresIn: "10m" }
        );
        response.cookie("token", token, {
          httpOnly: true,
          secure: false,
        });
        return response.send(
          "Welcome " + username + " btw ya password is " + password
        );
      } else {
        response.status(201).send("Wrong password");
      }
    } else {
      response.status(201).send("User does not exist");
    }
  } catch (error) {
    response.status(404).send(error);
  }
};

export default login;
