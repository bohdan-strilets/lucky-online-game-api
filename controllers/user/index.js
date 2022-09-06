const changeAccount = require("./changeAccount");
const changeAvatar = require("./changeAvatar");
const changeBank = require("./changeBank");
const changeEmail = require("./changeEmail");
const changePassword = require("./changePassword");
const getCurrent = require("./getCurrent");
const repeatVerification = require("./repeatVerification");
const verifyAccount = require("./verifyAccount");
const deleteAccount = require("./deleteAccount");
const sendResetPasswordEmail = require("./sendResetPasswordEmail");
const resetPassword = require("./resetPassword");
const createSession = require("./createSession");
const deleteSession = require("./deleteSession");
const changeComplexity = require("./changeComplexity");
const refreshUser = require("./refreshUser");

module.exports = {
  changeAccount,
  changeAvatar,
  changeBank,
  changeEmail,
  changePassword,
  getCurrent,
  repeatVerification,
  verifyAccount,
  deleteAccount,
  sendResetPasswordEmail,
  resetPassword,
  createSession,
  deleteSession,
  changeComplexity,
  refreshUser,
};
