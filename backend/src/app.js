const express = require("express");
const app = express();
const UserRoutes = require("./routes/UserRoutes.js");

// const cors = require("cors");

//Cors
// app.use(cors({ credentials: true, origin: "https://localhost:3000" }));

// Public folder for images
app.use(express.static("public"));

// Middleware
app.use(express.json());

// Routes User;
app.use("/users", UserRoutes);

// Rotas
app.get("/", (req, res) => {
	res.send("PrecinMobile backend funcionando!");
});

module.exports = app;
