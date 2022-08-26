const { Bet } = require("../../models");

const changeBet = async (req, res) => {
  const { betId } = req.params;
  const { betAmount, coefficient, isWon } = await Bet.findById(betId);

  if (isWon) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message:
        "The selected bet cannot be changed because the value of the isWon field is already positive.",
    });
  }

  const winningAmount = betAmount * coefficient;
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
