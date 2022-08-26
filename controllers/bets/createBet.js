const { Bet, Statistics } = require("../../models");

const createBet = async (req, res) => {
  const { _id } = req.user;
  const bet = req.body;

  const result = await Bet.create({ owner: _id, ...bet });
  const statistics = await Statistics.findOne({ owner: _id });
  const lostBets = statistics.totalBets - statistics.wonBets;

  await Statistics.findByIdAndUpdate(statistics._id, {
    $inc: {
      totalBets: 1,
      moneySpent: bet.betAmount,
      lostBets,
    },
  });

  return res.status(201).json({
    status: "ok",
    code: 201,
    Bet: result,
  });
};

module.exports = createBet;
