import {Router} from "express";
import * as profileController from "./profile.controller";

export const profileRoutes: Router = Router()

profileRoutes.post('/', profileController.createUserProfile)