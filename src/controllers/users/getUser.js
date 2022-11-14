const getUser = async (req, res) => {
	const { user } = req
	res.status(200)
	res.json(user)
}

module.exports = getUser