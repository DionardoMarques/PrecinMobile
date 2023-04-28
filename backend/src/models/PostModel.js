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
			productImage: {
				type: String,
			},
			price: {
				type: Number,
				required: true,
			},
			market: {
				type: String,
				required: true,
			},
			address: {
				type: String,
			},
			userID: {
				type: String,
				required: true,
			},
			userEmail: {
				type: String,
			},
			precin: {
				type: Array,
			},
			precao: {
				type: Array,
			},
			comments: {
				type: Number,
			},
		},
		{ timestamps: true }
	)
);

module.exports = Post;
