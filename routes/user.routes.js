const router = require("express").Router();
const c = require("../controllers/user.controller");
const validateId = require("../middleware/validateId");
const { requireAuth, requireAdmin } = require("../middleware/auth");

// Every user route needs a valid token
router.use(requireAuth);

// Admin only: list all users, create a user
router.get("/", requireAdmin, c.getAll);
router.post("/", requireAdmin, c.create);

// A user may manage their OWN record; an admin may manage anyone (checked in the controller)
router.get("/:id", validateId, c.getOne);
router.put("/:id", validateId, c.update);
router.delete("/:id", validateId, c.remove);

module.exports = router;
