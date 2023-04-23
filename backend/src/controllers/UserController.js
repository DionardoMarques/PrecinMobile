const User = require("../models/UserModel");

module.exports = class UserController {
	static async register(req, res) {
		res.json("Registrado");
	}
};
