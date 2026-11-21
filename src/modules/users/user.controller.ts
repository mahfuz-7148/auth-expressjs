import {type Request, type Response} from 'express'
import * as userService from "./user.service";

export const createUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.createUserDb(req.body)
    res.status(201).json({
      success: true,
      message: "User created!!",
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

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUserDb()
    res.status(200).json({
      success: true,
      message: "User retrieved!!",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error: error,
    });
  }
}

export const getSingleUser = async (req: Request, res: Response) => {
  try {
    const {id} = req.params
    const result = await userService.getSingleUserDb(id as string)
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User not found!!",
      });
    }
    res.status(200).json({
      success: true,
      message: "User retrieved!!",
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