const { Router } = require('express')
const router = Router()
const signUp = require('../../controllers/auth/signUp')
const signIn = require('../../controllers/auth/signIn')

// Routes
router.post('/auth/sign-up', signUp)
router.post('/auth/sign-in', signIn)

module.exports = router