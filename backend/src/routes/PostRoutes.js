const router = require("express").Router();
const PostController = require("../controllers/PostController");
const withAuth = require("../middlewares/withAuth");

router.post("/createpost", withAuth, PostController.createPost);
router.get("/getposts", PostController.getPosts);
router.get("/getuserposts", withAuth, PostController.getUserPosts);
router.get("/:id", PostController.getPostByID);
router.patch("/:id", withAuth, PostController.updatePost);
router.delete("/:id", withAuth, PostController.deletePost);

module.exports = router;
