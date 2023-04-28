const router = require("express").Router();
const UserController = require("../controllers/UserController");
const withAuth = require("../middlewares/withAuth");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/checkuser", UserController.checkUser);
router.get("/:id", UserController.getUserById);
router.patch("/edit", withAuth, UserController.editUser);
router.patch("/increaselist/:id", withAuth, UserController.increaseList);
router.patch("/decreaselist/:id", withAuth, UserController.decreaseList);
router.delete("/delete", withAuth, UserController.deleteUser);
module.exports = router;
