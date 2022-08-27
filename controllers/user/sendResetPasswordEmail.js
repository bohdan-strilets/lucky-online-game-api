const { User } = require("../../models");
const { sendEmail } = require("../../helpers");
const { resetPass } = require("../../layout");

const sendResetPasswordEmail = async (req, res) => {
  const { email } = req.body;

  const emailDatabase = await User.findOne({ email });

  if (!emailDatabase) {
    return res.json({
      status: "error",
      code: 400,
      message: "Email is wrong. Such a user does not exist.",
    });
  }

  const mail = resetPass(email, emailDatabase.name);
  await sendEmail(mail);

  return res.json({
    status: "ok",
    code: 200,
    message:
      "An email with a link to reset your password has been sent to your email address.",
  });
};

module.exports = sendResetPasswordEmail;
