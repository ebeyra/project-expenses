const { Schema, model } = require("mongoose");

const transactionSchema = new Schema(
  {
    date: {
      type: String,
    },
    category: {
      type: String,
      enum: [
        "Auto",
        "Credit Card",
        "Entertainment",
        "Groceries",
        "Internet",
        "Mobile",
        "Mortgage/Rent",
        "Refund",
        "Salary",
        "Streaming",
        "Utilities",
        "Other",
      ],
      default: "Other",
    },
    amount: Number,
    memo: {
      type: String,
      default: "Unspecified transaction",
    },
    product: [String],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = model("Transaction", transactionSchema);

module.exports = Transaction;
