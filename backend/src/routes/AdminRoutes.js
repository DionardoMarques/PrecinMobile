const router = require("express").Router();
const AdminController = require("../controllers/AdminController");

// Middlewares
const withAuth = require("../middlewares/withAuth");

router.post("/register", AdminController.register);
router.post("/login", AdminController.login);
router.get("/:id", withAuth, AdminController.getAdminById);
router.delete("/:id", AdminController.deleteAnyPost);

module.exports = router;
