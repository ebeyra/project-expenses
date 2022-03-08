const { Schema, model } = require("mongoose");

const budgetSchema = new Schema(
  {
    income: Number,
    auto: Number,
    creditCard: Number,
    entertainment: Number,
    groceries: Number,
    internet: Number,
    mobile: Number,
    rent: Number,
    streaming: Number,
    utilities: Number,
    other: Number,
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Budget = model("Budget", budgetSchema);

module.exports = Budget;
