const { User } = require("../../models");
const { hashSync, genSaltSync, compareSync } = require("bcryptjs");

const changePassword = async (req, res) => {
  const { password, newPassword } = req.body;
  const { _id } = req.user;
  const user = await User.findById(_id);

  if (!user) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "User not found.",
    });
  }

  if (!compareSync(password, user.password)) {
    return res.status(401).json({
      status: "error",
      code: 401,
      message: "Password is wrong.",
    });
  }

  const hashPassword = hashSync(newPassword, genSaltSync(10));
  await User.findByIdAndUpdate(_id, { password: hashPassword });

  return res.json({
    status: "ok",
    code: 200,
    message: "Password has been successfully updated.",
  });
};

module.exports = changePassword;
