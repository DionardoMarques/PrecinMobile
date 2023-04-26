const User = require("../models/UserModel");

const bcrypt = require("bcrypt");
const createUserToken = require("../helpers/createUserToken");
const getToken = require("../helpers/getToken");
const jwt = require("jsonwebtoken");

module.exports = class UserController {
	static async register(req, res) {
		const { name, email, password, confirmpassword } = req.body;

		// Validations
		if (!name) {
			res.status(422).json({ message: "The name is required" });
			return;
		}

		if (!email) {
			res.status(422).json({ message: "The e-mail is required" });
			return;
		}

		// Validations
		if (!password) {
			res.status(422).json({ message: "The password is required" });
			return;
		}

		if (!confirmpassword) {
			res.status(422).json({ message: "The confirm password is required" });
			return;
		}
		// password equals confirmpassword
		if (password !== confirmpassword) {
			res.status(422).json({
				message: "The password and password confirmation are not the same",
			});
			return;
		}

		// Checked email is exists
		const userExists = await User.findOne({ email: email });
		if (userExists) {
			res.status(422).json({
				message: "E-mail is exists in the system. Please use another e-mail!",
			});
			return;
		}

		// create a password
		const salt = await bcrypt.genSalt(12);
		const passwordHash = await bcrypt.hash(password, salt);

		//Create a user
		const user = new User({
			name: name,
			email: email,
			password: passwordHash,
			listPublic: [],
			listShoop: [],
			precao: [],
			precin: [],
		});

		try {
			const newUser = await user.save();
			await createUserToken(newUser, req, res);
		} catch (error) {
			res.status(500).json({ message: error });
		}
	}

	static async login(req, res) {
		const { email, password } = req.body;

		if (!email) {
			res.status(422).json({ message: "The e-mail is required" });
			return;
		}

		if (!password) {
			res.status(422).json({ message: "The password is required" });
			return;
		}

		// Checked email is exists
		const user = await User.findOne({ email: email });
		if (!user) {
			res.status(422).json({
				message: "Email not registered in the System!",
			});
			return;
		}
		// Check if password match with mongoose password
		const checkPassword = await bcrypt.compare(password, user.password);
		if (!checkPassword) {
			res.status(422).json({
				message: "Password invalid!",
			});
			return;
		}
		await createUserToken(user, req, res);
	}

	// User in the system
	static async checkUser(req, res) {
		let currentUser;
		if (req.headers.authorization) {
			const token = getToken(req);
			// variable ambit
			const secret = process.env.JWT_TOKEN;
			const decoded = jwt.verify(token, secret);
			currentUser = await User.findById(decoded.id).select("-password");
		} else {
			currentUser = null;
		}
		res.status(200).send(currentUser);
	}
};
