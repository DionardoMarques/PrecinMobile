const express = require("express");
const app = express();

// Routes
const UserRoutes = require("./routes/UserRoutes.js");
const PostRoutes = require("./routes/PostRoutes.js");
const AdminRoutes = require("./routes/AdminRoutes.js");

// Iniciando o servidor na porta 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Servidor rodando na porta: ${PORT}`);
});

const cors = require("cors");

//Cors
app.use(cors({ credentials: true, origin: "https://localhost:3000" }));

// Public folder for images
app.use(express.static("public"));

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