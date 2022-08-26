const express = require("express");

const { level: ctrl } = require("../controllers");
const { validation, ctrlWrapper, auth } = require("../middlewares");
const {
  levelJoiSchema,
  rankJoiSchema,
  experienceJoiSchema,
} = require("../models/level");

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.getInfo));

router.patch(
  "/level",
  auth,
  validation(levelJoiSchema),
  ctrlWrapper(ctrl.changeLevel)
);

router.patch(
  "/experience",
  auth,
  validation(experienceJoiSchema),
  ctrlWrapper(ctrl.changeExperience)
);

router.patch(
  "/rank",
  auth,
  validation(rankJoiSchema),
  ctrlWrapper(ctrl.changeRank)
);

module.exports = router;
