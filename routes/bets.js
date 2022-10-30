const express = require("express");

const { bets: ctrl } = require("../controllers");
const { validation, ctrlWrapper, auth } = require("../middlewares");
const { betJoiSchema, isWonJoiSchema } = require("../models/bet");

const router = express.Router();

router.get("/get-all", auth, ctrlWrapper(ctrl.getAll));

router.get("/get-one/:betId", auth, ctrlWrapper(ctrl.getOne));

router.post(
  "/create-bet",
  auth,
  validation(betJoiSchema),
  ctrlWrapper(ctrl.createBet)
);

router.put(
  "/change-bet/:betId",
  auth,
  validation(isWonJoiSchema),
  ctrlWrapper(ctrl.changeBet)
);

module.exports = router;
