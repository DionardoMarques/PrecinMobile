const express = require("express");
const app = express();
const path = require("path");

// Routes
const UserRoutes = require("./routes/UserRoutes.js");
const PostRoutes = require("./routes/PostRoutes.js");
const AdminRoutes = require("./routes/AdminRoutes.js");

const cors = require("cors");

//Cors
app.use(cors());

// Public folder for images
app.use(
	"/files",
	express.static(path.resolve(__dirname, "src", "public", "images"))
);

// Middleware
app.use(express.json());

// Routes User;
app.use("/users", UserRoutes);

// Routes Post
app.use("/posts", PostRoutes);

// Routes Admin
app.use("/admins", AdminRoutes);

// Rotas
app.get("/", (req, res) => {
	res.send("PrecinMobile backend funcionando!");
});

module.exports = app;
