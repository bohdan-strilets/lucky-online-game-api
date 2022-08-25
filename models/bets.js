const { Schema, model } = require("mongoose");
const joi = require("joi");

const betsSchema = Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    type: {
      type: String,
      required: [true, "The type field is required."],
    },
    number: {
      type: Number,
      default: null,
    },
    color: {
      type: String,
      default: null,
    },
    isWon: {
      type: Boolean,
      default: false,
    },
    betAmount: {
      type: Number,
      required: [true, "The bet amount field is required."],
    },
    coefficient: {
      type: Number,
      required: [true, "The coefficient field is required."],
    },
    winningAmount: {
      type: Number,
    },
  },
  { versionKey: false, timestamps: true }
);

const betJoiSchema = joi.object({
  type: joi.string().required(),
  number: joi.number().required(),
  color: joi.string().valid("red", "black").required(),
  betAmount: joi.number().min(1).required(),
  coefficient: joi.number().min(1).required(),
});

const isWonJoiSchema = joi.object({
  isWon: joi.bool().required("The is won field is required."),
  winningAmount: joi.number().min(1).required(),
});

const Bets = model("bets", betsSchema);

module.exports = {
  Bets,
  betJoiSchema,
  isWonJoiSchema,
};
