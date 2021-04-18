//function to validate user login
const Validator = require("validator");
const isEmpty = require("is-empty");
const bcrypt = require("bcryptjs");

const e = require("express");

module.exports = function validateLogin(data) {
  //we want to validate a login
  //email checks -> valid email
  //email checks -> valid email
  //password checks -> valid password

  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email empty";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email invalid";
  }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password empty";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
