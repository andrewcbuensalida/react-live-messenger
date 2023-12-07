const express = require("express");
const validateForm = require("../controllers/express/validateForm");
const router = express.Router();
const {
  handleLogin,
  attemptLogin,
  attemptRegister,
} = require("../controllers/authController");
const rateLimiter = require("../controllers/express/rateLimiter");

router
  .route("/login")
  .get(handleLogin) // if it's a get request, this is for if client has a token already. when user reloads any page or changes user. it's in a custom hook in react.
  .post(validateForm, rateLimiter(60, 10), attemptLogin); // user clicking login with username and password
router.post("/signup", validateForm, rateLimiter(30, 4), attemptRegister);
module.exports = router;
