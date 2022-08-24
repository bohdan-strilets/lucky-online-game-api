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

const isWonJoiSchema = joi.object({
  isWon: joi.bool().required("The is won field is required."),
  winningAmount: joi
    .number()
    .min(1, "The minimum allowed value is exactly 1.")
    .required("The winning amount field is required."),
});

const Bets = model("bets", betsSchema);

module.exports = {
  Bets,
  isWonJoiSchema,
};
