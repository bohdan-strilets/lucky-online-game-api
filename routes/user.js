const express = require("express");

const { user: ctrl } = require("../controllers");
const { validation, ctrlWrapper, auth, upload } = require("../middlewares");
const {
  emailJoiSchema,
  passwordJoiSchema,
  bankJoiSchema,
  changeJoiSchema,
  resetPasswordJoiSchema,
  complexityJoiSchema,
  buyItemJoiSchema,
} = require("../models/user");

const router = express.Router();

router.get("/get-current", auth, ctrlWrapper(ctrl.getCurrent));

router.patch(
  "/change-email",
  auth,
  validation(emailJoiSchema),
  ctrlWrapper(ctrl.changeEmail)
);

router.patch(
  "/change-password",
  auth,
  validation(passwordJoiSchema),
  ctrlWrapper(ctrl.changePassword)
);

router.patch(
  "/change-bank",
  auth,
  validation(bankJoiSchema),
  ctrlWrapper(ctrl.changeBank)
);

router.patch(
  "/change-avatar",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.changeAvatar)
);

router.patch(
  "/change-profile",
  auth,
  validation(changeJoiSchema),
  ctrlWrapper(ctrl.changeAccount)
);

router.get(
  "/verification-email/:verificationToken",
  ctrlWrapper(ctrl.verifyAccount)
);

router.post(
  "/repeat-verification",
  validation(emailJoiSchema),
  ctrlWrapper(ctrl.repeatVerification)
);

router.delete("/delete-account", auth, ctrlWrapper(ctrl.deleteAccount));

router.post(
  "/send-password-email",
  validation(emailJoiSchema),
  ctrlWrapper(ctrl.sendResetPasswordEmail)
);

router.post(
  "/reset-password",
  validation(resetPasswordJoiSchema),
  ctrlWrapper(ctrl.resetPassword)
);

router.patch(
  "/new-session",
  auth,
  validation(complexityJoiSchema),
  ctrlWrapper(ctrl.createSession)
);

router.patch(
  "/change-complexity",
  auth,
  validation(complexityJoiSchema),
  ctrlWrapper(ctrl.changeComplexity)
);

router.get("/refresh-user", ctrlWrapper(ctrl.refreshUser));

router.delete("/delete-session", auth, ctrlWrapper(ctrl.deleteSession));

router.get("/get-all-users", auth, ctrlWrapper(ctrl.getAllUsers));

router.post(
  "/buy-item",
  auth,
  validation(buyItemJoiSchema),
  ctrlWrapper(ctrl.buyItem)
);

router.put(
  "/sell-item",
  auth,
  validation(buyItemJoiSchema),
  ctrlWrapper(ctrl.sellItem)
);

module.exports = router;
