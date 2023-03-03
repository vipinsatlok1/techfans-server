const router = require("express").Router();
const controller = require("../controllers/projects");
const { authUser, authRole } = require("../middlewares/auth");

router.post("/", authUser, authRole, controller.add);
router.put("/:id", authUser, authRole, controller.update);
router.delete("/:id", authUser, authRole, controller.delete);
router.get("/:id", controller.getSingle);
router.get("/", controller.getMany);
router.put("/like/:id", authUser, authRole, controller.like);
router.put("/rating/:id", authUser, authRole, controller.rating);


module.exports = router;
