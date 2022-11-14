const pool = require('../conn/pool')
const generateToken = require('../utils/generateToken')
const hashPassword = require('../utils/hashPassword')
const verifyPassword = require('../utils/verifyPassword')

exports.signUp = async (req, res) => {
	const { email, password } = req.body
	const sql = 'INSERT INTO users (email, password) VALUES (?, ?)'
	const hash = await hashPassword(password)
	const params = [email, hash]

	try {
		await pool.query(sql, params)
		res.status(201)
		res.json({ message: 'User created!' })
		return
	} catch (error) {
		console.error(error)
		if (error.code === 'ER_DUP_ENTRY') {
			res.status(403)
			res.json({ message: 'User already exists' })
			return
		}
	}
}

exports.signIn = async (req, res) => {
	const { email, password } = req.body
	const sql = 'SELECT * FROM users WHERE email = ?'

	try {
		const rows = await pool.query(sql, email)

		if (rows.length === 0) {
			res.status(404)
			res.json({ message: 'User not found in database' })
			return
		}

		const user = rows[0]
		const hash = user.password
		const match = await verifyPassword(password, hash)

		if (!match) {
			res.status(403)
			res.json({ message: 'Invalid credentials' })
			return
		}

		const token = await generateToken(user)

		res
			.set({
				Authorization: `Bearer ${token}`
			})
			.status(200)
			.json({ message: 'logged in' })

	} catch (error) {
		console.log(error)
	}
}