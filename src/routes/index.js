const { Router } = require('express')
const router = Router()
const { signUp, signIn } = require('../controllers/users.routes')

router.get('/', (req, res) => {
	res.json({ msg: 'Hello world' })
})

router.post('/users/sign-up', signUp)
router.post('/users/sign-in', signIn)

module.exports = router