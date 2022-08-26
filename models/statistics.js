const { Schema, model } = require("mongoose");
const joi = require("joi");

const statisticsSchema = Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    timeInGame: {
      type: Number,
      default: 0,
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

const timeJoiSchema = joi.object({
  timeInGame: joi.number().min(1).required(),
});

const Statistics = model("statistics", statisticsSchema);

module.exports = {
  Statistics,
  timeJoiSchema,
};
