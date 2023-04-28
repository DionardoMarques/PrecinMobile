const jwt = require("jsonwebtoken");
const getToken = require("../helpers/getToken");
require("dotenv/config");

// middleware to validate token
const checkToken = (req, res, next) => {
	if (!req.headers.authorization) {
		return res.status(401).json({ message: "Access denied!" });
	}

	const token = getToken(req);
	if (!token) {
		return res.status(401).json({ message: "Access denied!" });
	}

	try {
		const secret = process.env.JWT_TOKEN;
		const verified = jwt.verify(token, secret);
		req.user = verified;
		next();
	} catch (err) {
		return res.status(400).json({ message: "Invalid Token!" });
	}
};
module.exports = checkToken;
