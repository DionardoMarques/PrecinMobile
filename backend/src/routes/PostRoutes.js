const router = require("express").Router();
const PostController = require("../controllers/PostController");

// Create post
router.post("/createpost", PostController.createPost);

// Get all posts
router.get("/getposts", PostController.getPosts);
// // Get user's post(s)
// router.get("/getuserposts", PostController.getUserPosts);
// // Get post by ID
// router.get("/:id", PostController.getPostByID);

// // Update post
// router.patch("/:id", PostController.updatePost);

// // Delete post
// router.delete("/:id", PostController.deletePost);

module.exports = router;
