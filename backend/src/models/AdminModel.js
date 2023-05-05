const mongoose = require("../database/db");
const { Schema } = mongoose;

const Admin = mongoose.model(
	"Admin",
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
			permission: {
				type: Number,
				required: true,
			},
		},
		{ timestamps: true }
	)
);

module.exports = Admin;
