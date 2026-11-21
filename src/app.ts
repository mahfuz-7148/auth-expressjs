import express, {type Application, type Request, type Response} from 'express'
import {userRoutes} from "./modules/users/user.route";
import {authRoutes} from "./modules/auth/auth.route";

export const app: Application = express()

app.use(express.json())
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/auth', authRoutes)

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'this is root route'
  })
})