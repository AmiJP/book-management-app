import { body } from "express-validator";

const signupValidator = [
  body("email").isEmail().withMessage("Email must be valid"),
  body("password")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Password must be between 4 and 20 characters"),
];

const signinValidator = [
  body("email").isEmail().withMessage("Email must be valid"),
  body("password").trim().notEmpty().withMessage("You must supply a password"),
];

export { signupValidator, signinValidator };
