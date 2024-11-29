import { Router } from 'express'
import * as authController from '../controllers/auth'
import * as pingController from '../controllers/ping'

export const mainRouter = Router()

mainRouter.get('/ping', pingController.ping)
mainRouter.post('/auth/signin', authController.signin)
mainRouter.post('/auth/signup', authController.signup)
mainRouter.post('/auth/useotp', authController.useOTP)
