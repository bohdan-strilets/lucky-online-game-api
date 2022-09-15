const { Schema, model } = require("mongoose");

const statisticsSchema = Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    totalBets: {
      type: Number,
      default: 0,
    },
    wonBets: {
      type: Number,
      default: 0,
    },
    lostBets: {
      type: Number,
      default: 0,
    },
    moneySpent: {
      type: Number,
      default: 0,
    },
    moneyEarned: {
      type: Number,
      default: 0,
    },
  },
  { versionKey: false, timestamps: true }
);

const Statistics = model("statistics", statisticsSchema);

module.exports = {
  Statistics,
};
