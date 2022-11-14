const pool = require('../../conn/pool')
const hashPassword = require('../../utils/hashPassword')

const signUp = async (req, res) => {
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
		if (error.code === 'ER_DUP_ENTRY') {
			res.status(403)
			res.json({ message: 'User already exists' })
			return
		}
	}
}

module.exports = signUp