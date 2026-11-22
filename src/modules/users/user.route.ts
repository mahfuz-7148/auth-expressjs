import {Router} from "express";
import * as userController from "./user.controller";
import {auth} from "../../middleware/auth.middleware";
import {USER_ROLE} from "../../types";

export const userRoutes: Router = Router()

userRoutes.post('/', userController.createUser)
userRoutes.get('/', auth(USER_ROLE.admin, USER_ROLE.agent), userController.getAllUser)
userRoutes.get('/:id', userController.getSingleUser)
userRoutes.put('/:id', userController.updateUser)
userRoutes.delete('/:id', userController.deleteSingleUser)