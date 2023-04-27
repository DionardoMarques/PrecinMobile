require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const getUserByToken = async (token) => {
	if (!token) {
		return res.status(401).json({ message: "Access denied!" });
	}

	const secret = process.env.JWT_TOKEN;
	const decoded = jwt.verify(token, secret);
	const userId = decoded.id;
	const user = await User.findOne({ _id: userId });
	return user;
};
module.exports = getUserByToken;
