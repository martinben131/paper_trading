//function to validate registration of a user
const Validator = require("validator");
const isEmpty = require("is-empty");


const e = require("express");

module.exports = function validateRegistration(data) {
  //we want to validate a registration
  //name checks -> name not empty
  //email checks -> valid email
  //password checks -> valid password and passwords match

  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.username = !isEmpty(data.username) ? data.username : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is empty";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // Name checks
  if (Validator.isEmpty(data.username)) {
    errors.username = "Username is empty";
  }

  // Password checks
  // check the password isn't empty
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password empty";
  }
  //check confirmation password isn't empty
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password empty";
  }
  //check the length of the password is at least 6 characters
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
  //check that the passords match
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
