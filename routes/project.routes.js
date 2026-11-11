const router = require("express").Router();
const c = require("../controllers/project.controller");
const validateId = require("../middleware/validateId");
const { requireAuth, requireAdmin } = require("../middleware/auth");

// Anyone (even signed out) may read the portfolio content
router.get("/", c.getAll);
router.get("/:id", validateId, c.getOne);

// Only a signed-in administrator may create, update or delete
router.post("/", requireAuth, requireAdmin, c.create);
router.put("/:id", requireAuth, requireAdmin, validateId, c.update);
router.delete("/:id", requireAuth, requireAdmin, validateId, c.remove);

module.exports = router;
