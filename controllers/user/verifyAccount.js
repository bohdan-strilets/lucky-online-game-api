const { User } = require("../../models");

const verifyAccount = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });

  if (!user) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "User not found.",
    });
  }

  await User.findByIdAndUpdate(user._id, {
    isVerified: true,
    verificationToken: null,
  });

  res.json({
    status: "ok",
    code: 200,
    message: "Verification successful.",
  });
};

module.exports = verifyAccount;
