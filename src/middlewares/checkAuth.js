const jwt = require('jsonwebtoken')

const checkAuth = async (req, res, netx) => {
	const { authorization } = req.headers

	const token = authorization && authorization.toLowerCase().startsWith('bearer ')
		? authorization.split(' ')[1]
		: null

	if (!token) {
		res.status(401)
		res.json({ message: 'jwt invalid or no provided' })
		return
	}

	try {
		const user = await jwt.verify(token, process.env.SECRET_KEY)
		req.user = user
		netx()
	} catch (error) {
		res.status(500)
		res.json({ message: 'Error token validation' })
		return
	}
}

module.exports = checkAuth