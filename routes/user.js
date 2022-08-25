const express = require("express");

const { user: ctrl } = require("../controllers");
const { validation, ctrlWrapper, auth, upload } = require("../middlewares");
const {
  emailJoiSchema,
  passwordJoiSchema,
  bankJoiSchema,
  changeJoiSchema,
  verificationJoiSchema,
} = require("../models/user");

const router = express.Router();

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.patch(
  "/email",
  auth,
  validation(emailJoiSchema),
  ctrlWrapper(ctrl.changeEmail)
);

router.patch(
  "/password",
  auth,
  validation(passwordJoiSchema),
  ctrlWrapper(ctrl.changePassword)
);

router.patch(
  "/bank",
  auth,
  validation(bankJoiSchema),
  ctrlWrapper(ctrl.changeBank)
);

router.patch(
  "/avatar",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.changeAvatar)
);

router.put(
  "/profile",
  auth,
  validation(changeJoiSchema),
  ctrlWrapper(ctrl.changeAccount)
);

router.get("/verification/:verificationToken", ctrlWrapper(ctrl.verifyAccount));

router.post(
  "/verification",
  validation(verificationJoiSchema),
  ctrlWrapper(ctrl.repeatVerification)
);

module.exports = router;
