require("dotenv").config();

const jwt = require("jsonwebtoken");
const secret = process.env.JWT_TOKEN;
const createAdminToken = async (admin, req, res) => {
	const token = jwt.sign(
		{
			name: admin.name,
			id: admin._id,
		},
		secret
	);
	// return token (name and id)
	res.status(200).json({
		message: "You are authenticated",
		token: token,
		adminId: admin._id,
	});
};
module.exports = createAdminToken;
