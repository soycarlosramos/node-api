const { Router } = require('express')
const router = Router()
const signUp = require('../../controllers/auth/signUp')
const signIn = require('../../controllers/auth/signIn')

// Routes
router.post('/users/sign-up', signUp)
router.post('/users/sign-in', signIn)

module.exports = router