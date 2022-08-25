const { User } = require("../../models");
const { sendEmail } = require("../../helpers");
const { confirmEmail } = require("../../layout");
const { v4 } = require("uuid");

const changeEmail = async (req, res) => {
  const { email } = req.body;
  const { _id } = req.user;
  const user = await User.findById(_id);

  if (!user) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "User not found.",
    });
  }

  const verificationToken = v4();
  const mail = confirmEmail(email, verificationToken);
  await sendEmail(mail);

  await User.findByIdAndUpdate(_id, {
    email,
    verificationToken,
    isVerified: false,
  });

  return res.json({
    status: "ok",
    code: 200,
    email,
    message:
      "The email address has been successfully changed, now you need to re-verify it.",
  });
};

module.exports = changeEmail;
