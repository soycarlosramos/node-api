import jwt  from 'jsonwebtoken'

const generateToken = async claims => {
	delete claims.password
	delete claims.date

	// claims
	claims = JSON.stringify({
		...claims,
		iat: Math.floor(Date.now() / 1000),
		exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7),
		iss: 'node-api'
	})

	const options = {
		header: {
			typ: 'JWT'
		}
	}

	return await jwt.sign(claims, process.env.JWT_SECRET_KEY, options)
}

export default generateToken