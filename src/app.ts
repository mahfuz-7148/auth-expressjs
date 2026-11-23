import express, {type Application, type Request, type Response} from 'express'
import {userRoutes} from "./modules/users/user.route";
import {authRoutes} from "./modules/auth/auth.route";
import {profileRoutes} from "./modules/profile/profile.route";
import {logger} from "./middleware/logger";
import {globalErrorHandler} from "./middleware/error.handler";
import cors from 'cors'
import cookieParser from "cookie-parser";

export const app: Application = express()
const corsOptions = {
  origin: ["http://localhost:3000"],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())
app.use(logger)
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/profile', profileRoutes)

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'this is root route'
  })
})

app.use(globalErrorHandler)