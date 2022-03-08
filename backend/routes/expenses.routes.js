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
          res.json({ message: "Your items", foundTransactions, foundBudget });
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
  const { monthlyIncome } = req.body;
  if (!monthlyIncome) {
    return res
      .status(400)
      .json({ errorMessage: "Please enter an estimated monthly income" });
  }
  Budget.create({
    monthlyIncome: req.body.monthlyIncome,
    needs: {
      auto: req.body.auto,
      creditCard: req.body.creditCard,
      groceries: req.body.groceries,
      internet: req.body.internet,
      mobile: req.body.mobile,
      rent: req.body.rent,
      utilities: req.body.utilities,
      other: req.body.other,
    },
    wants: req.body.wants,
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

router.get(
  "/transactions/edit",
  isAuthenticated,
  (req, res, next) => {
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
  }
);

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
          monthlyIncome: foundBudget.monthlyIncome,
          needs: {
            auto: foundBudget.needs.auto,
            creditCard: foundBudget.needs.creditCard,
            groceries: foundBudget.needs.groceries,
            internet: foundBudget.needs.internet,
            mobile: foundBudget.needs.mobile,
            rent: foundBudget.needs.rent,
            utilities: foundBudget.needs.utilities,
            other: foundBudget.needs.other,
          },
          wants: foundBudget.wants,
        },
      });
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

// router.post("/budgets/:budgetId/edit", isAuthenticated, (req, res, next) => {
//   Budget.findByIdAndUpdate(
//     req.params.budgetId,
//     {
//       monthlyIncome: req.body.monthlyIncome,
//       needs: {
//         auto: req.body.auto,
//         creditCard: req.body.creditCard,
//         groceries: req.body.groceries,
//         internet: req.body.internet,
//         mobile: req.body.mobile,
//         rent: req.body.rent,
//         utilities: req.body.utilities,
//         other: req.body.other,
//       },
//       wants: req.body.wants,
//     },
//     { new: true }
//   )
//     .then((updatedDetails) => {
//       res.json({ message: "Budget details updated", updatedDetails });
//     })
//     .catch((err) => {
//       res.status(500).json(err.message);
//     });
// });

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
