const { User } = require("../../models");
const { sendEmail } = require("../../helpers");
const { confirmEmail } = require("../../layoutEmails");
const { v4 } = require("uuid");

const repeatVerification = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

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
  await User.findByIdAndUpdate(user._id, { verificationToken });

  return res.json({
    status: "ok",
    code: 200,
    message: "The confirmation email has been sent again.",
  });
};

module.exports = repeatVerification;
