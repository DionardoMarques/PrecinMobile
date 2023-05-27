const express = require("express");
const app = express();
const path = require("path");

// Routes
const UserRoutes = require("./src/routes/UserRoutes.js");
const PostRoutes = require("./src/routes/PostRoutes.js");
const AdminRoutes = require("./src/routes/AdminRoutes.js");

// Iniciando o servidor na porta 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Servidor rodando na porta: ${PORT}`);
});

const cors = require("cors");
// Config cors
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
