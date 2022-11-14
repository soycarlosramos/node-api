const { Router } = require('express')
const router = Router()
const signUp = require('../../controllers/users/user.signUp')
const signIn = require('../../controllers/users/user.signIn')

// Routes
router.post('/users/sign-up', signUp)
router.post('/users/sign-in', signIn)

module.exports = router