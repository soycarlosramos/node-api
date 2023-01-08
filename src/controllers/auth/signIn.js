import pool from '../../conn/pool.js'
import generateToken from '../../utils/generateToken.js'
import verifyPassword from '../../utils/verifyPassword.js'

const signIn = async (req, res) => {
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

export default signIn