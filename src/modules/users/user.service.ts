import type {IUser} from "./user.interface";
import bcrypt from 'bcryptjs'
import {pool} from "../../db";

export const createUserDb = async (payload: IUser) => {
  const {name, email, password, age} = payload
  const hashedPassword = await bcrypt.hash(password, 10)
  const result = await pool.query(`
   INSERT INTO users(name, email, password, age)
   VALUES($1, $2, $3, $4) RETURNING *
  `, [name, email, hashedPassword, age])
  // console.log(result)
  delete result.rows[0].password
  return result
}

export const getAllUserDb = async () => {
  return await pool.query(`
   SELECT * FROM users  
   `)
}

export const getSingleUserDb = async (id: string) => {
  return await pool.query(`
   SELECT * FROM users WHERE id = $1
   `, [id])
}