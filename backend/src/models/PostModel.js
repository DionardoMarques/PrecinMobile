const mongoose = require("../database/db");
const { Schema } = mongoose;

// 10 fields in total for Post
const Post = mongoose.model(
	"Post",
	new Schema(
		{
			product: {
				type: String,
				required: true,
			},
			price: {
				type: Number,
				required: true,
			},
			market: {
				type: String,
				required: true,
			},
			productImage: String,
			address: String,
			userID: Object,
			userEmail: String,
			precin: Array,
			precao: Array,
			comments: Number,
		},
		{ timestamps: true }
	)
);

module.exports = Post;
