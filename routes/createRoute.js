const router = require("express").Router();
exports.createRoute = (name) => {
  const controller = require(`../controllers/projects${name}`);
  router.post("/", controller.add);
  router.put("/:id", controller.update);
  router.delete("/:id", controller.delete);
  router.get("/:id", controller.getSingle);
  router.get("/", controller.getMany);
  router.put("/like/:id", controller.like);
  router.put("/rating/:id", controller.rating);
  return router;
};
