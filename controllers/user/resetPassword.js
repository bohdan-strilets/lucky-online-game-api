const { User } = require("../../models");
const { hashSync, genSaltSync } = require("bcryptjs");

const resetPassword = async (req, res) => {
  const { password, email } = req.body;
  const hashPassword = hashSync(password, genSaltSync(10));

  const user = await User.findOne({ email });

  if (!user) {
    return res.code(404).json({
      status: "error",
      code: 404,
      message: "Invalid email. There is no user with this email address.",
    });
  }

  await User.findByIdAndUpdate(user._id, { password: hashPassword });

  return res.json({
    status: "ok",
    code: 200,
    message: "The password has been successfully changed.",
  });
};

module.exports = resetPassword;
