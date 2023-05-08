const Post = require("../models/PostModel");

const getToken = require("../helpers/getToken");
const getUserByToken = require("../helpers/getUserByToken");

const mongoose = require("mongoose");

module.exports = class PostController {
	static async createPost(req, res) {
		const { product, price, market, address } = req.body;

		const token = getToken(req);
		let user;
		try {
			user = await getUserByToken(token);
		} catch (error) {
			res.status(401).json({ message: "Token invalid" });
			return;
		}

		let productImage = "";

		if (req.file) {
			productImage = req.file.filename;
		}

		// Validations
		if (!product) {
			res.status(422).json({ message: "The name of product is required!" });
			return;
		}

		if (!price) {
			res.status(422).json({ message: "The price of product is required!" });
			return;
		}

		if (!market) {
			res.status(422).json({ message: "The name of market is required!" });
			return;
		}

		if (user.type == false) {
			res.status(422).json({ message: "The type must be true" });
			return;
		} else {
			// Create Post
			const post = new Post({
				product: product,
				productImage: productImage,
				price: price,
				market: market,
				address: address,
				userID: { _id: user._id },
				userEmail: "",
				precin: [],
				precao: [],
				comments: 0,
			});

			try {
				await post.save();

				// Return a message and the required fields of the post created
				res.status(200).json({
					message: "Post created successfully!",
					product: product,
					price: price,
					market: market,
				});
			} catch (error) {
				res.status(500).json({ message: error });
			}
		}
	}

	static async getPosts(req, res) {
		const posts = await Post.find().sort("-createdAt");

		if (posts.length == 0) {
			res.status(200).json({
				message: "No posts to return.",
			});
		} else {
			res.status(200).json({
				posts: posts,
			});
		}
	}

	static async getUserPosts(req, res) {
		const token = getToken(req);
		let user;
		try {
			user = await getUserByToken(token);
		} catch (error) {
			res.status(401).json({ message: "Token invalid" });
			return;
		}
		const posts = await Post.find({ "userID._id": user._id }).sort(
			"-createdAt"
		);

		if (posts.length == 0) {
			res.status(200).json({
				message: "No posts created by this user.",
			});
		} else {
			res.status(200).json({ posts });
		}
	}

	static async getPostByID(req, res) {
		const id = req.params.id;
		const ObjectId = mongoose.Types.ObjectId;

		let post;

		// Verifying if exists posts with the :id param exists inside the database
		try {
			post = await Post.findById(id);
		} catch (error) {
			res.status(500).json({
				message: `An error occurred with the id: ${id}, please verify and try again.`,
				error: error.message,
			});

			return;
		}

		if (!ObjectId.isValid(id)) {
			res.status(422).json({
				message: `Post with ${id} is invalid.`,
			});

			return;
		}

		if (!post) {
			res.status(404).json({
				message: "Post not found.",
			});

			return;
		}

		res.status(200).json({ post });
	}

	static async updatePost(req, res) {
		const { product, price, market, address } = req.body;

		const id = req.params.id;
		const ObjectId = mongoose.Types.ObjectId;

		const token = getToken(req);
		let user;
		try {
			user = await getUserByToken(token);
		} catch (error) {
			res.status(401).json({ message: "Token invalid" });
			return;
		}

		const updateData = {};

		let post;

		let productImage = "";

		if (req.file) {
			productImage = req.file.filename;
		}
		updateData.productImage = productImage;

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

		if (post.userID._id.toString() !== user._id.toString()) {
			res.status(422).json({ message: "Access denied! Not your post" });

			return;
		}

		// Required
		if (!product) {
			res.status(422).json({ message: "The name of product is required!" });
			return;
		} else {
			updateData.product = product;
		}

		if (!price) {
			res.status(422).json({ message: "The price of product is required!" });
			return;
		} else {
			updateData.price = price;
		}

		if (!market) {
			res.status(422).json({ message: "The name of market is required!" });
			return;
		} else {
			updateData.market = market;
		}

		// Not required
		if (productImage) {
			updateData.productImage = productImage;
		}

		if (address) {
			updateData.address = address;
		}

		await Post.findByIdAndUpdate(id, updateData);

		res.status(200).json({ message: "Post updated successfully!" });
	}

	static async deletePost(req, res) {
		const id = req.params.id;
		const ObjectId = mongoose.Types.ObjectId;

		const token = getToken(req);
		let user;
		try {
			user = await getUserByToken(token);
		} catch (error) {
			res.status(401).json({ message: "Token invalid" });
			return;
		}

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

		if (post.userID._id.toString() !== user._id.toString()) {
			res.status(422).json({ message: "Access denied!" });

			return;
		}

		await Post.findByIdAndRemove(id);

		res.status(200).json({ message: "Post removed successfully!" });
	}
};
