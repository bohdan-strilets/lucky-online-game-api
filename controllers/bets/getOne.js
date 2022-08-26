const { Bet } = require("../../models");

const getOne = async (req, res) => {
  const { betId } = req.params;
  const result = await Bet.findById(betId).populate(
    "owner",
    "_id name avatarURL"
  );

  if (!result) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found.",
    });
  }

  return res.json({
    status: "ok",
    code: 200,
    bet: result,
  });
};

module.exports = getOne;
