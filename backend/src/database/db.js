// const mongoose = require("mongoose");
// const config = require("../config/config");

// mongoose.connect(config.dbUri, {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true,
// 	useCreateIndex: true,
// });

// const db = mongoose.connection;

// db.on("error", console.error.bind(console, "Erro conexão MongoDB:"));

// db.once("open", () => {
// 	console.log("MongoDB conectado com sucesso!");
// });

// // module.exports = db;
// module.exports = { db: db, mongoose: mongoose };
