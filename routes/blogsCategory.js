const router = require("express").Router();
const controller = require("../controllers/blogsCategory");
const { authUser, authRole } = require("../middlewares/auth");

router.post("/", authUser, authRole, controller.add);
router.put("/:id", authUser, authRole, controller.update);
router.delete("/:id", authUser, authRole, controller.delete);
router.get("/:id", controller.getSingle);
router.get("/", controller.getMany);

module.exports = router;
