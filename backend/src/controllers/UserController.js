const User = require("../models/UserModel");
const Post = require("../models/PostModel");

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
			permission: 0,
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
		let user;
		if (req.headers.authorization) {
			const token = getToken(req);
			try {
				user = await getUserByToken(token);
			} catch (error) {
				res.status(401).json({ message: "Token invalid" });
				return;
			}
			try {
				currentUser = await User.findById(user.id).select("-password");
			} catch (error) {
				res.status(422).json({
					message: `User not find.`,
				});
			}
			if (currentUser) {
				res.status(200).send(currentUser);
				return;
			}
			return;
		} else {
			res.status(401).json({
				message: "No permission, because it hasn't bearer token",
			});
			return;
		}
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
		let user;
		try {
			user = await getUserByToken(token);
		} catch (error) {
			res.status(401).json({ message: "Token invalid" });
			return;
		}
		const { name, email, password, confirmpassword } = req.body;

		let image = "";

		if (req.file) {
			image = req.file.filename;
		}
		user.image = image;

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
		let user;
		try {
			user = await getUserByToken(token);
		} catch (error) {
			res.status(401).json({ message: "Token invalid" });
			return;
		}
		try {
			await User.findByIdAndRemove(user._id);
			res.status(200).json({
				message: `User deleted with successufuly`,
			});
		} catch (err) {
			if (!user) {
				res.status(422).json({
					message: `User not find.`,
				});
				return;
			}
			res.status(500).json({ message: err });
			return;
		}
		return;
	}
	static async increaseList(req, res) {
		const token = getToken(req);
		let user;
		try {
			user = await getUserByToken(token);
		} catch (error) {
			res.status(401).json({ message: "Token invalid" });
			return;
		}
		const id = req.params.id;
		const ObjectId = mongoose.Types.ObjectId;
		if (!ObjectId.isValid(id)) {
			res.status(422).json({
				message: `User with ${id} invalid.`,
			});
			return;
		}
		try {
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
		const token = getToken(req);
		let user;
		try {
			user = await getUserByToken(token);
		} catch (error) {
			res.status(401).json({ message: "Token invalid" });
			return;
		}
		const id = req.params.id;
		const ObjectId = mongoose.Types.ObjectId;
		if (!ObjectId.isValid(id)) {
			res.status(422).json({
				message: `User with ${id} invalid.`,
			});
			return;
		}
		try {
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
	static async precin(req, res) {
		const token = getToken(req);
		let user;
		try {
			user = await getUserByToken(token);
		} catch (error) {
			res.status(401).json({ message: "Token invalid" });
			return;
		}
		const id = req.params.id;
		let vaw;
		const ObjectId = mongoose.Types.ObjectId;
		if (!ObjectId.isValid(id)) {
			res.status(422).json({
				message: `User with ${id} invalid.`,
			});
			return;
		}
		const post = await Post.findById(id);
		if (!post) {
			res.status(404).json({
				message: "Post not found.",
			});
			return;
		}
		if (user.precin.includes(id)) {
			vaw = false;
			for (var i = 0; i < user.precin.length; i++) {
				if (user.precin[i] == id) {
					user.precin.splice(i, 1);
				}
			}
			for (var p = 0; p < post.precin.length; p++) {
				if (post.precin[p] == user.id) {
					post.precin.splice(p, 1);
				}
			}
		} else {
			vaw = true;
			for (var i = 0; i < user.precao.length; i++) {
				if (user.precao[i] == id) {
					user.precao.splice(i, 1);
				}
			}
			for (var p = 0; p < post.precao.length; p++) {
				if (post.precao[p] == user.id) {
					post.precao.splice(p, 1);
				}
			}
			user.precin.push(id);
			post.precin.push(user.id);
		}
		try {
			await User.findByIdAndUpdate(user._id, user);
			await Post.findByIdAndUpdate(post._id, post);
			if (vaw) {
				res.status(201).json({
					message: "The precin was increase with successfully!",
				});
			} else {
				res.status(201).json({
					message: "The precin was decrease with successfully!",
				});
			}
			return;
		} catch (error) {
			res.status(500).json({ message: error });
			return;
		}
	}
	static async precao(req, res) {
		const token = getToken(req);
		let user;
		try {
			user = await getUserByToken(token);
		} catch (error) {
			res.status(401).json({ message: "Token invalid" });
			return;
		}
		const id = req.params.id;
		let vaw;
		const ObjectId = mongoose.Types.ObjectId;
		if (!ObjectId.isValid(id)) {
			res.status(422).json({
				message: `User with ${id} invalid.`,
			});
			return;
		}
		const post = await Post.findById(id);
		if (!post) {
			res.status(404).json({
				message: "Post not found.",
			});
			return;
		}
		if (user.precao.includes(id)) {
			vaw = false;
			for (var i = 0; i < user.precao.length; i++) {
				if (user.precao[i] == id) {
					user.precao.splice(i, 1);
				}
			}
			for (var p = 0; p < post.precao.length; p++) {
				if (post.precao[p] == user.id) {
					post.precao.splice(p, 1);
				}
			}
		} else {
			vaw = true;
			for (var i = 0; i < user.precin.length; i++) {
				if (user.precin[i] == id) {
					user.precin.splice(i, 1);
				}
			}
			for (var p = 0; p < post.precin.length; p++) {
				if (post.precin[p] == user.id) {
					post.precin.splice(p, 1);
				}
			}
			user.precao.push(id);
			post.precao.push(user.id);
		}
		try {
			await User.findByIdAndUpdate(user._id, user);
			await Post.findByIdAndUpdate(post._id, post);
			if (vaw) {
				res.status(201).json({
					message: "The precao was increase with successfully!",
				});
			} else {
				res.status(201).json({
					message: "The precao was decrease with successfully!",
				});
			}
			return;
		} catch (error) {
			res.status(500).json({ message: error });
			return;
		}
	}
};
