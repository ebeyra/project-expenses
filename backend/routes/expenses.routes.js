const router = require("express").Router();
const Transaction = require("../models/Transaction.model");
const Budget = require("../models/Budget.model");
const axios = require("axios");

// Middleware imports
const { isAuthenticated } = require("../middleware/isAuthenticated");

// Expenses landing page

router.get("/", isAuthenticated, (req, res, next) => {
  Budget.find({ createdBy: req.payload._id })
    .populate("createdBy")
    .then((foundBudget) => {
      Transaction.find({ createdBy: req.payload._id })
        .populate("createdBy")
        .then((foundTransactions) => {
          let autoTransactions = foundTransactions.filter((item) => {
            return item.category === "Auto";
          });
          let creditCardTransactions = foundTransactions.filter((item) => {
            return item.category === "Credit Card";
          });
          let entertainmentTransactions = foundTransactions.filter((item) => {
            return item.category === "Entertainment";
          });
          let groceriesTransactions = foundTransactions.filter((item) => {
            return item.category === "Groceries";
          });
          let internetTransactions = foundTransactions.filter((item) => {
            return item.category === "Internet";
          });
          let mobileTransactions = foundTransactions.filter((item) => {
            return item.category === "Mobile";
          });
          let rentTransactions = foundTransactions.filter((item) => {
            return item.category === "Mortgage/Rent";
          });
          let streamingTransactions = foundTransactions.filter((item) => {
            return item.category === "Streaming";
          });
          let utilitiesTransactions = foundTransactions.filter((item) => {
            return item.category === "Utilities";
          });
          let otherTransactions = foundTransactions.filter((item) => {
            return item.category === "Other";
          });
          res.json({
            message: "Your items",
            foundTransactions,
            foundBudget,
            autoTransactions,
            creditCardTransactions,
            entertainmentTransactions,
            groceriesTransactions,
            internetTransactions,
            mobileTransactions,
            rentTransactions,
            streamingTransactions,
            utilitiesTransactions,
            otherTransactions,
          });
        });
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

// Create a transaction

router.get("/new-transaction", isAuthenticated, (req, res, next) => {
  res.json("Create a transaction");
});

router.post("/new-transaction", isAuthenticated, (req, res, next) => {
  // Date, category, and memo have defaults set, so only amount is required
  const { amount } = req.body;
  if (!amount) {
    return res
      .status(400)
      .json({ errorMessage: "Please specify an amount for this transaction." });
  }
  Transaction.create({
    date: req.body.date,
    category: req.body.category,
    amount: req.body.amount,
    memo: req.body.memo,
    product: req.body.product,
    createdBy: req.payload._id,
  })
    .then((newTransaction) => {
      res.json({ message: "Transaction created", newTransaction });
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

// Create a budget

router.get("/new-budget", isAuthenticated, (req, res, next) => {
  res.json("Create a budget");
});

router.post("/new-budget", isAuthenticated, (req, res, next) => {
  // No defaults set, but monthly income required
  const { income } = req.body;
  if (!income) {
    return res
      .status(400)
      .json({ errorMessage: "Please enter an estimated monthly income" });
  }
  Budget.create({
    income: req.body.income,
    auto: req.body.auto,
    creditCard: req.body.creditCard,
    entertainment: req.body.entertainment,
    groceries: req.body.groceries,
    internet: req.body.internet,
    mobile: req.body.mobile,
    rent: req.body.rent,
    streaming: req.body.streaming,
    utilities: req.body.utilities,
    other: req.body.other,
    createdBy: req.payload._id,
  })
    .then((newBudget) => {
      res.json({ message: "Budget created", newBudget });
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

// View a transaction

router.get(
  "/transactions/:transactionId",
  isAuthenticated,
  (req, res, next) => {
    Transaction.findById(req.params.transactionId)
      .then((foundTransaction) => {
        res.json({ message: "Transaction details", foundTransaction });
      })
      .catch((err) => {
        res.status(500).json(err.message);
      });
  }
);

// View budget

router.get("/budgets/:budgetId", isAuthenticated, (req, res, next) => {
  Budget.findById(req.params.budgetId)
    .then((foundBudget) => {
      res.json({ message: "Budget details", foundBudget });
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

// Edit a transaction

router.get("/transactions/edit", isAuthenticated, (req, res, next) => {
  Transaction.findById(req.params.transactionId)
    .then((foundTransaction) => {
      res.json({
        message: "Populated info to update",
        transactionInfo: {
          date: foundTransaction.date,
          category: foundTransaction.category,
          amount: foundTransaction.amount,
          memo: foundTransaction.memo,
        },
      });
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

router.post(
  "/transactions/:transactionId/edit",
  isAuthenticated,
  (req, res, next) => {
    Transaction.findByIdAndUpdate(
      req.params.transactionId,
      {
        ...req.body,
      },
      { new: true }
    )
      .then((updatedDetails) => {
        res.json({ message: "Transaction details updated", updatedDetails });
      })
      .catch((err) => {
        res.status(500).json(err.message);
      });
  }
);

// Edit a budget

router.get("/budgets/:budgetId/edit", isAuthenticated, (req, res, next) => {
  Budget.findById(req.params.budgetId)
    .then((foundBudget) => {
      res.json({
        message: "Populated info to update",
        budgetInfo: {
          income: foundBudget.income,
          auto: foundBudget.auto,
          creditCard: foundBudget.creditCard,
          entertainment: foundBudget.entertainment,
          groceries: foundBudget.groceries,
          internet: foundBudget.internet,
          mobile: foundBudget.mobile,
          rent: foundBudget.rent,
          streaming: foundBudget.streaming,
          utilities: foundBudget.utilities,
          other: foundBudget.other,
        },
      });
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

router.post("/budgets/:budgetId/edit", isAuthenticated, (req, res, next) => {
  Budget.findByIdAndUpdate(
    req.params.budgetId,
    {
      ...req.body,
    },
    { new: true }
  )
    .then((updatedDetails) => {
      res.json({ message: "Budget details updated", updatedDetails });
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

// Delete transaction

router.post(
  "/transactions/:transactionId/delete",
  isAuthenticated,
  (req, res, next) => {
    Transaction.findByIdAndRemove(req.params.transactionId)
      .then((transactionToRemove) => {
        res.json({ message: "Transaction removed", transactionToRemove });
      })
      .catch((err) => {
        res.status(500).json(err.message);
      });
  }
);

// Delete a budget

router.post("/budgets/:budgetId/delete", isAuthenticated, (req, res, next) => {
  Budget.findByIdAndRemove(req.params.budgetId)
    .then((budgetToRemove) => {
      res.json({ message: "Budget removed", budgetToRemove });
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

// API test route

router.post("/get-item", (req, res, next) => {
  const options = {
    method: "GET",
    url: "https://amazon-data-scrapper3.p.rapidapi.com/search/iphone%2013",
    params: { api_key: process.env.API_KEY },
    headers: {
      "x-rapidapi-host": "amazon-data-scrapper3.p.rapidapi.com",
      "x-rapidapi-key": "f4ba7c63e8mshd3469625cf6b591p190b6bjsned2971a08c98",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      res.json(response.data);
    })
    .catch(function (error) {
      console.error(error.message);
      res.json(error.message);
    });
});

module.exports = router;
