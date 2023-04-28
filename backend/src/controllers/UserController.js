const User = require("../models/UserModel");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const createUserToken = require("../helpers/createUserToken");
const getToken = require("../helpers/getToken");
const getUserByToken = require("../helpers/getUserByToken");

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
	static async getUserById(req, res) {
		const id = req.params.id;
		const ObjectId = mongoose.Types.ObjectId;
		if (!ObjectId.isValid(id)) {
			res.status(422).json({
				message: `User with ${id} invalid.`,
			});
			return;
		}
		//Check if user exists and withdraw password
		const user = await User.findById(id).select("-password"); // ex password
		if (!user) {
			res.status(422).json({
				message: `User with ${id} not found`,
			});
			return;
		}
		res.status(200).json({ user });
	}
	// Protected edit user JWT
	static async editUser(req, res) {
		//Check if user exists
		const token = getToken(req);
		const user = await getUserByToken(token);
		const { name, email, password, confirmpassword, image } = req.body;

		if (req.file) {
			user.image = req.file.filename;
		}

		//validations
		if (!name) {
			res.status(422).json({ message: "The name is required" });
			return;
		}
		user.name = name;

		if (!email) {
			res.status(422).json({ message: "The e-mail is required" });
			return;
		}
		// Check if email has already taken
		const userExists = await User.findOne({ email: email });
		if (user.email !== email && userExists) {
			res.status(422).json({ message: "Please use another e-mail" });
			return;
		}
		user.email = email;
		if (password !== confirmpassword) {
			res.status(422).json({
				message: "The password and password confirmation are not the same",
			});
			return;
		} else if (password === confirmpassword && password != null) {
			// create a password
			const salt = await bcrypt.genSalt(12);
			const passwordHash = await bcrypt.hash(password, salt);
			user.password = passwordHash;
		}
		user.image = image;
		try {
			// returns user updated data
			await User.findOneAndUpdate(
				{ _id: user._id },
				{ $set: user },
				{ new: true }
			);
			res.status(200).json({
				message: `User edit with successfully`,
			});
		} catch (err) {
			res.status(500).json({ message: err });
			return;
		}
		return;
	}
	static async deleteUser(req, res) {
		//Check if user exists
		const token = getToken(req);
		const user = await getUserByToken(token);
		try {
			await user.delete();
			res.status(200).json({
				message: `User deleted with successufuly`,
			});
		} catch (err) {
			res.status(500).json({ message: err });
			return;
		}
		return;
	}
	static async increaseList(req, res) {
		const id = req.params.id;
		const ObjectId = mongoose.Types.ObjectId;
		if (!ObjectId.isValid(id)) {
			res.status(422).json({
				message: `User with ${id} invalid.`,
			});
			return;
		}
		try {
			const token = getToken(req);
			const user = await getUserByToken(token);
			if (user.listShoop.includes(id)) {
				res.status(422).json({ message: "Post already list" });
				return;
			}
			user.listShoop.push(id);
			await User.findByIdAndUpdate(user._id, user);
			res.status(201).json({
				message: "The post was push with successfully!",
			});
			return;
		} catch (error) {
			res.status(500).json({ message: error });
			return;
		}
	}
	static async decreaseList(req, res) {
		const id = req.params.id;
		const ObjectId = mongoose.Types.ObjectId;
		if (!ObjectId.isValid(id)) {
			res.status(422).json({
				message: `User with ${id} invalid.`,
			});
			return;
		}
		try {
			const token = getToken(req);
			const user = await getUserByToken(token);
			// const vaw = false;
			for (var i = 0; i < user.listShoop.length; i++) {
				if (user.listShoop[i] == id) {
					user.listShoop.splice(i, 1);
					// vaw = true;
				}
			}
			// if (!vaw) {
			// 	res.status(422).json({ message: "Post not already list" });
			// 	return;
			// }
			await User.findByIdAndUpdate(user._id, user);
			res.status(201).json({
				message: "The post was deleted with successfully!",
			});
			return;
		} catch (error) {
			res.status(500).json({ message: error });
		}
	}
};
