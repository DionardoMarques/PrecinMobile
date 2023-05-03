const router = require("express").Router();
const UserController = require("../controllers/UserController");

//Middlewares
const withAuth = require("../middlewares/withAuth");
const { imageUpload } = require("../middlewares/imageUpload");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/checkuser", UserController.checkUser);
router.get("/:id", UserController.getUserById);
router.patch(
	"/edit",
	withAuth,
	imageUpload.single("image"),
	UserController.editUser
);
router.patch("/increaselist/:id", withAuth, UserController.increaseList);
router.patch("/decreaselist/:id", withAuth, UserController.decreaseList);
router.patch("/precin/:id", withAuth, UserController.precin);
router.patch("/precao/:id", withAuth, UserController.precao);
router.delete("/delete", withAuth, UserController.deleteUser);
module.exports = router;
