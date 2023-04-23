const express = require("express");
const app = express();

// Middleware
app.use(express.json());

// Rotas
app.get("/", (req, res) => {
	res.send("PrecinMobile backend funcionando!");
});

module.exports = app;
