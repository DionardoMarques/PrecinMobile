const mongoose = require("../config/newConfig");
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
			listPublic: {
				type: Array,
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
