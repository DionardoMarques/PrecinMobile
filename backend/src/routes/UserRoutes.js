const router = require("express").Router();
const UserController = require("../controllers/UserController");
const withAuth = require("../helpers/withAuth");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/checkuser", UserController.checkUser);
router.get("/:id", UserController.getUserById);
router.patch("/edit", withAuth, UserController.editUser);
router.delete("/delete", withAuth, UserController.deleteUser);
module.exports = router;
