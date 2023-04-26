const Post = require("../models/PostModel");
const User = require("../models/UserModel");

module.exports = class PostController {
	static async createPost(req, res) {
		const { product, price, market, userID } = req.body;

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

		if (!userID) {
			res.status(422).json({ message: "The ID of user is required!" });
			return;
		} else {
			const fetch_user = await User.findById(userID);

			if (!fetch_user) {
				res.status(422).json({
					message:
						"This user ID doesn't exists, please verify and try again a valid user ID.",
				});
				return;
			}
			// Valid user ID inputed for the user, following the natural flux for the post creation
			else {
				// Create Post
				const post = new Post({
					product: product,
					productImage: "",
					price: price,
					market: market,
					address: "",
					userID: userID,
					userEmail: "",
					precin: [],
					precao: [],
					comments: [],
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
	}
};
