const express = require("express");

const { statistics: ctrl } = require("../controllers");
const { validation, ctrlWrapper, auth } = require("../middlewares");
const { timeJoiSchema } = require("../models/statistics");

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.getInfo));

router.patch(
  "/change-time",
  auth,
  validation(timeJoiSchema),
  ctrlWrapper(ctrl.changeTime)
);

module.exports = router;
