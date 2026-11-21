import {Router} from "express";
import * as userController from "./user.controller";

export const userRoutes: Router = Router()

userRoutes.post('/', userController.createUser)
userRoutes.get('/', userController.getAllUser)
userRoutes.get('/:id', userController.getSingleUser)