const User = require("../models/User.model");
const router = require("express").Router();

// How many rounds should bcrypt run the salt (default [10 - 12 rounds])
const saltRounds = 10;
const bcrypt = require("bcryptjs");

// Middleware imports
const { isAuthenticated } = require("../middleware/isAuthenticated");

// Page lands on profile

router.get("/profile", isAuthenticated, (req, res, next) => {
  User.findOne({ _id: req.payload._id })
    .then((foundUser) => {
      res.json({ message: "Found user", foundUser });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json(err.message);
    });
});

// User can view their account details

router.get("/profile/:userId", isAuthenticated, (req, res, next) => {
  User.findById(req.params.userId)
    .then((userDetails) => {
      res.json({ message: "Account details", userDetails });
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

// Update account details

router.get("/profile/edit", isAuthenticated, (req, res, next) => {
  User.findById(req.payload._id)
    .then((userDetails) => {
      res.json({
        message: "Populated info to update",
        accountInfo: {
          username: userDetails.username,
          password: userDetails.password,
          firstName: userDetails.firstName,
          lastName: userDetails.lastName,
        },
      });
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

// router.post("/profile/:userId/edit", isAuthenticated, (req, res, next) => {
//   if (req.body.password) {
//     const salt = bcrypt.genSaltSync(saltRounds);
//     const hashedPass = bcrypt.hashSync(req.body.password, salt);
//     req.body.password = hashedPass;
//   }
//   User.findByIdAndUpdate(
//     req.params.userId,
//     {
//       ...req.body,
//     },
//     { new: true }
//   )
//     .then((updatedDetails) => {
//       res.json({ message: "User details updated", updatedDetails });
//     })
//     .catch((err) => {
//       res.status(500).json(err.message);
//     });
// });

router.post("/profile/edit", isAuthenticated, (req, res, next) => {
  if (req.body.password) {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPass = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hashedPass;
  }
  User.findByIdAndUpdate(
    req.payload._id,
    {
      ...req.body,
    },
    { new: true }
  )
    .then((updatedDetails) => {
      console.log(updatedDetails);
      res.json({ message: "User details updated", updatedDetails });
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

// Delete account

router.post("/profile/delete", isAuthenticated, (req, res, next) => {
  User.findByIdAndRemove(req.payload._id)
    .then((userToRemove) => {
      res.json({ message: "User removed", userToRemove });
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

// :params replaced by token

module.exports = router;
