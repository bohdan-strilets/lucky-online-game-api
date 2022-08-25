const { User } = require("../../models");

const changeBank = async (req, res) => {
  const { bank } = req.body;
  const { _id } = req.user;

  const result = await User.findByIdAndUpdate(
    _id,
    {
      $inc: { bank },
    },
    { new: true }
  );

  return res.json({
    status: "ok",
    code: 200,
    bank: result.bank,
  });
};

module.exports = changeBank;
