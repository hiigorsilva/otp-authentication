import { Router } from 'express'
import * as authController from '../controllers/auth'
import * as pingController from '../controllers/ping'
import * as privateController from '../controllers/private'
import { verifyJWT } from '../libs/jwt'

export const mainRouter = Router()

// TEST ROUTES
mainRouter.get('/ping', pingController.ping)

// AUTH ROUTES
mainRouter.post('/auth/signin', authController.signin)
mainRouter.post('/auth/signup', authController.signup)
mainRouter.post('/auth/useotp', authController.useOTP)

// PRIVATE ROUTES
mainRouter.get('/private', verifyJWT, privateController.test)
