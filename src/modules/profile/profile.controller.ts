import type {Request, Response} from "express";
import * as profileService from "./profile.service";

export const createUserProfile = async (req: Request, res: Response) => {
  try {
    const result = await profileService.createUserProfileDb(req.body)
    res.status(201).json({
      success: true,
      message: "User Profile created!!",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error: error,
    });
  }
}