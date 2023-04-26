require("dotenv").config();

const jwt = require("jsonwebtoken");
const secret = process.env.JWT_TOKEN;
const createUserToken = async (user, req, res) => {
	const token = jwt.sign(
		{
			name: user.name,
			id: user._id,
		},
		secret
	);
	// return token (name and id)
	res.status(200).json({
		message: "You are authenticated",
		token: token,
		userId: user._id,
	});
};
module.exports = createUserToken;
