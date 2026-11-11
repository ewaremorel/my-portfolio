const router = require("express").Router();
const c = require("../controllers/auth.controller");
const { requireAuth } = require("../middleware/auth");

router.post("/signup", c.signup);
router.post("/signin", c.signin);
router.post("/signout", requireAuth, c.signout);
router.get("/me", requireAuth, c.me);

module.exports = router;
