import { Router } from 'express'
const router = Router()
import signUp from '../../controllers/auth/signUp.js'
import signIn from '../../controllers/auth/signIn.js'

// Routes
router.post('/auth/sign-up', signUp)
router.post('/auth/sign-in', signIn)

export default router