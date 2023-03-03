const auth = require("../controllers/auth");
const { authUser, authRole } = require("../middlewares/auth");
const router = require("express").Router();

router.post("/register", auth.register);
router.post("/login", auth.login);
router.get("/logout", auth.logout);
router.get("/me", authUser, auth.getuser);
router.put("/:id", authUser, authRole, auth.updateUser);
router.delete("/:id", authUser, authRole, auth.deleteUser);
router.get("/users", authUser, authRole, auth.getMany);

module.exports = router;
