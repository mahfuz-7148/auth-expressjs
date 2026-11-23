import type {Request, Response} from "express";
import * as authService from "./auth.service";

export const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.loginUserDb(req.body)
    // console.log(result)
    const {refreshToken} = result

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // dev: http, production: HTTPS-only
      path: '/',
      sameSite: 'lax'
    })
    res.status(200).json({
      success: true,
      message: "User logged in!!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error: error,
    });
  }
}

export const generateToken = async (req: Request, res: Response) => {
  // console.log(req.cookies)
  try {
    const result = await authService.generateAccessToken(req.cookies.refreshToken)

    res.status(200).json({
      success: true,
      message: "access token generated",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error: error,
    });
  }
}