import type {Request, Response} from "express";
import * as authService from "./auth.service";

export const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.loginUserDb(req.body)
    // console.log(result)
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