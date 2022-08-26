const { Bet, Statistics } = require("../../models");

const changeBet = async (req, res) => {
  const { betId } = req.params;
  const { _id } = req.user;
  const { betAmount, coefficient, isWon } = await Bet.findById(betId);
  const statistics = await Statistics.findOne({ owner: _id });

  if (isWon) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message:
        "The selected bet cannot be changed because the value of the isWon field is already positive.",
    });
  }

  const winningAmount = betAmount * coefficient;

  await Statistics.findByIdAndUpdate(statistics._id, {
    $inc: {
      wonBets: 1,
      moneyEarned: winningAmount,
    },
  });

  const result = await Bet.findByIdAndUpdate(
    betId,
    { ...req.body, winningAmount },
    { new: true }
  );

  return res.json({
    status: "ok",
    code: 200,
    bet: result,
  });
};

module.exports = changeBet;
