const router = require("express").Router();

const controller = require("./../controller/reviews.controller");

router.get("/", controller.findAll);

router.get("/:id", controller.findOne);

router.post("/", controller.save);

router.put("/:id", controller.updateById);

router.patch("/:id", controller.updateById);

router.delete("/:id", controller.deleteById);

module.exports = router;
