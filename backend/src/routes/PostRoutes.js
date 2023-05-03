const router = require("express").Router();
const PostController = require("../controllers/PostController");
const withAuth = require("../middlewares/withAuth");
const { imageUpload } = require("../middlewares/imageUpload");

router.post(
	"/createpost",
	withAuth,
	imageUpload.single("productImage"),
	PostController.createPost
);
router.get("/getposts", PostController.getPosts);
router.get("/getuserposts", withAuth, PostController.getUserPosts);
router.get("/:id", PostController.getPostByID);
router.patch(
	"/:id",
	withAuth,
	imageUpload.single("productImage"),
	PostController.updatePost
);
router.delete("/:id", withAuth, PostController.deletePost);

module.exports = router;
