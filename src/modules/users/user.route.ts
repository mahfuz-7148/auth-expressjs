import {Router} from "express";
import * as userController from "./user.controller";
import {auth} from "../../middleware/auth.middleware";

export const userRoutes: Router = Router()

userRoutes.post('/', userController.createUser)
userRoutes.get('/', auth(), userController.getAllUser)
userRoutes.get('/:id', userController.getSingleUser)
userRoutes.put('/:id', userController.updateUser)
userRoutes.delete('/:id', userController.deleteSingleUser)