import { Router } from 'express'
const router =  Router()

import getUser from '../../controllers/users/getUser.js'
import checkAuth from '../../middlewares/checkAuth.js'

// Routes
router.get('/users/profile', checkAuth, getUser)

export default router