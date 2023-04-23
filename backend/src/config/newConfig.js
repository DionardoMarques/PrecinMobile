const mongoose = require("mongoose");
require("dotenv").config();

async function main() {
	await mongoose.connect(
		`mongodb+srv://root:NbGSzMNohO42R3NQ@clusterprecin.7cy7hko.mongodb.net/?retryWrites=true&w=majority`,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	);
}
main()
	.then(() => {
		console.log("Connect to MongoDB");
	})
	.catch((err) => console.log(err));

module.exports = mongoose;
