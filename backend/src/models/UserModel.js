const mongoose = require("../database/db");
const { Schema } = mongoose;
const User = mongoose.model(
	"User",
	new Schema(
		{
			name: {
				type: String,
				required: true,
			},
			email: {
				type: String,
				required: true,
			},
			password: {
				type: String,
				required: true,
			},
			image: {
				type: String,
			},
			listShoop: {
				type: Array,
			},
			precao: {
				type: Array,
			},
			precin: {
				type: Array,
			},
		},
		{ timestamps: true }
	)
);

module.exports = User;
