import {pool} from "../../db";
import bcrypt from "bcryptjs";
import jwt, {type JwtPayload} from "jsonwebtoken"
import {config} from "../../config";

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
    role: user.rows[0].role
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_secret, {
    expiresIn: "1h",
  });
  const refreshToken = jwt.sign(jwtPayload, config.refresh_jwt_secret, {
    expiresIn: "7d",
  });

  return {accessToken, refreshToken, user: user.rows[0] }
}

export const generateAccessToken = async (token: string) => {
  if (!token) {
    throw new Error("Unauthorized access!!")
  }
  const decode = jwt.verify(token, config.refresh_jwt_secret) as JwtPayload
  // console.log(decode)
  const user = await pool.query(`
     SELECT * FROM users WHERE email = $1
    `, [decode.email])
  // console.log(user.rows[0])
  if (user.rowCount === 0) {
    throw new Error("User not found!!")
  }
  if (!user.rows[0].is_active) {
    throw new Error("Forbidden!!")
  }
  const jwtPayload = {
    id: user.rows[0].id,
    name: user.rows[0].name,
    email: user.rows[0].email,
    role: user.rows[0].role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_secret, {
    expiresIn: "1h",
  });

  return { accessToken }
}