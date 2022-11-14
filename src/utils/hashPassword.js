const bcrypt = require('bcrypt')

const hashPassword = async password => {

	try {
		const hash = await bcrypt.hash(password, 10)
		return hash
	} catch (error) {
		console.log(error)
	}
}

module.exports = hashPassword