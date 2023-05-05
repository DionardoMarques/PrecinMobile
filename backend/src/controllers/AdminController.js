const Admin = require("../models/AdminModel");
const Post = require("../models/PostModel");

const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const createAdminToken = require("../helpers/createAdminToken");

module.exports = class AdminController {
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
		const adminExists = await Admin.findOne({ email: email });

		if (adminExists) {
			res.status(422).json({
				message:
					"The email provided already exists in database, please give another!",
			});
			return;
		}

		// create a password
		const salt = await bcrypt.genSalt(12);
		const passwordHash = await bcrypt.hash(password, salt);

		//Create a admin
		const admin = new Admin({
			name: name,
			email: email,
			password: passwordHash,
			permission: 1,
		});

		try {
			const newAdmin = await admin.save();
			await createAdminToken(newAdmin, req, res);
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
		const admin = await Admin.findOne({ email: email });

		if (!admin) {
			res.status(422).json({
				message: "Email not registered in the System!",
			});
			return;
		}

		// Check if password match with mongoose password
		const checkPassword = await bcrypt.compare(password, admin.password);

		if (!checkPassword) {
			res.status(422).json({
				message: "Password invalid!",
			});
			return;
		}
		await createAdminToken(admin, req, res);
	}

	static async getAdminById(req, res) {
		const id = req.params.id;
		const ObjectId = mongoose.Types.ObjectId;

		if (!ObjectId.isValid(id)) {
			res.status(422).json({
				message: `Admin with ${id} invalid.`,
			});
			return;
		}

		//Check if admin exists and withdraw password
		const admin = await Admin.findById(id).select("-password"); // ex password

		if (!admin) {
			res.status(422).json({
				message: `Admin with ${id} not found`,
			});
			return;
		}
		res.status(200).json({ admin });
	}

	// Admin can delete any post without authentication
	static async deleteAnyPost(req, res) {
		const id = req.params.id;
		const ObjectId = mongoose.Types.ObjectId;

		let post;

		// Verifying if exists posts with the :id param exists inside the database
		try {
			post = await Post.findOne({ _id: id });
		} catch (error) {
			res.status(500).json({
				message: `An error occurred with the id: ${id}, please verify and try again.`,
				error: error.message,
			});

			return;
		}

		if (!ObjectId.isValid(id)) {
			res.status(422).json({
				message: `Post with ${id} invalid.`,
			});
			return;
		}

		if (!post) {
			res.status(404).json({ message: "Post not found" });

			return;
		}

		await Post.findByIdAndRemove(id);

		res.status(200).json({ message: "Post removed successfully!" });
	}
};
