const { Schema, model } = require("mongoose");

const budgetSchema = new Schema(
  {
    monthlyIncome: {
      type: Number,
      required: true,
    },
    needs: {
      auto: Number,
      creditCard: Number,
      groceries: Number,
      internet: Number,
      mobile: Number,
      rent: Number,
      utilities: Number,
      other: Number,
    },
    wants: [
      {
        name: String,
        price: String,
      },
    ],
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
