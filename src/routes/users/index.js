const { Router } = require('express')
const router =  Router()

const getUser = require('../../controllers/users/getUser')
const checkAuth = require('../../middlewares/checkAuth')

// Routes
router.get('/users/profile', checkAuth, getUser)

module.exports = router