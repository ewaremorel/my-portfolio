const router = require("express").Router();
const c = require("../controllers/contact.controller");
const validateId = require("../middleware/validateId");
const { requireAuth, requireAdmin } = require("../middleware/auth");

// Anyone can SEND a message from the public contact form
router.post("/", c.create);

// Messages contain private details (email, phone), so only admins can read/change them
router.get("/", requireAuth, requireAdmin, c.getAll);
router.get("/:id", requireAuth, requireAdmin, validateId, c.getOne);
router.put("/:id", requireAuth, requireAdmin, validateId, c.update);
router.delete("/:id", requireAuth, requireAdmin, validateId, c.remove);

module.exports = router;
