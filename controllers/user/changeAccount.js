const { User } = require("../../models");

const changeAccount = async (req, res) => {
  const { _id } = req.user;

  const result = await User.findByIdAndUpdate(_id, req.body, { new: true });

  return res.json({
    status: "ok",
    code: 200,
    user: {
      name: result.name,
      nickname: result.nickname,
      dateBirth: result.dateBirth,
      gender: result.gender,
      updatedAt: result.updatedAt,
    },
  });
};

module.exports = changeAccount;
