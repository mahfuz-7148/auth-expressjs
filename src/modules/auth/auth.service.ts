import {pool} from "../../db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const loginUserDb = async (payload: {email: string, password: string}) => {
  const {email, password} = payload
  const user = await pool.query(`
   SELECT * FROM users WHERE email = $1
  `, [email])
  // console.log(user)
  if (user.rowCount === 0) {
    throw new Error("Invalid credentials!!");
  }

  const matchPassword = await bcrypt.compare(password, user.rows[0].password);

  if (!matchPassword) {
    throw new Error("Invalid credentials!!");
  }
  if (!user.rows[0].is_active) {
    throw new Error("Access denied!!");
  }
  const jwtPayload = {
    id: user.rows[0].id,
    name: user.rows[0].name,
    email: user.rows[0].email,
  };

  const accessToken = jwt.sign(jwtPayload, "secret-for-jwt", {
    expiresIn: "1d",
  });

  return {accessToken, user: user.rows[0] }
}