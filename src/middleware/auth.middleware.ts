import type {NextFunction, Request, Response} from "express";
import jwt, {type JwtPayload} from "jsonwebtoken";
import {config} from "../config";
import {pool} from "../db";
import type {Role} from "../types";

export const auth = (...roles: Role[]) => {
  // console.log(roles)
  return async (req: Request, res: Response, next: NextFunction) => {
    // console.log(req)
    // console.log(req.headers.authorization)
   try {
     const token = req.headers.authorization?.split(" ")[1];
     if (!token) {
       return res.status(401).json({
         success: false,
         message: "Unauthorized access!!",
       });
     }
     const decode = jwt.verify(token, config.jwt_secret) as JwtPayload
     // console.log(decode)
     const user = await pool.query(`
     SELECT * FROM users WHERE email = $1
    `, [decode.email])
     // console.log(user.rows[0])
     if (user.rowCount === 0) {
       return res.status(404).json({
         success: false,
         message: "User not found!!",
       });
     }
     if (!user.rows[0].is_active) {
       return res.status(403).json({
         success: false,
         message: "Forbidden!!",
       });
     }
     if (roles.length && !roles.includes(user.rows[0].role)) {
       return res.status(401).json({
         success: false,
         message: "Unauthorized access!!",
       });
     }
     req.user = decode
     // console.log(req)
     next()
   } catch (err) {
     next(err)
   }
  }
}