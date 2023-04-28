const mongoose = require("mongoose");
require("dotenv").config();

const user = process.env.USERDB;
const password = encodeURIComponent(process.env.PASSWORDDB);

async function main() {
	await mongoose.connect(
		`mongodb+srv://${user}:${password}@clusterprecin.7cy7hko.mongodb.net/?retryWrites=true&w=majority`,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	);
}
main()
	.then(() => {
		console.log("Conectado ao MongoDB");
	})
	.catch((err) => console.log(err));

module.exports = mongoose;
