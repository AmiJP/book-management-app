import { body, param } from "express-validator";

const authorIdParamValidator = [
  param("authorId")
    .notEmpty()
    .isInt()
    .withMessage("Author ID is required and must be an integer"),
];

const authorInsertionValidator = [
  body("author")
    .isString()
    .isLength({ min: 1 })
    .withMessage("Author name is required"),
  body("born")
    .isISO8601()
    .withMessage("Born date must be in ISO8601 format (yyyy-mm-dd)"),
  body("city").isString().isLength({ min: 1 }).withMessage("City is required"),
];

const authorUpdateValidator = [
  ...authorIdParamValidator,
  body("author")
    .isString()
    .isLength({ min: 1 })
    .optional()
    .withMessage("Author name is required"),
  body("born")
    .isString()
    .isLength({ min: 1 })
    .optional()
    .withMessage("Born date is required"),
  body("city")
    .isString()
    .isLength({ min: 1 })
    .optional()
    .withMessage("City is required"),
];

export {
  authorInsertionValidator,
  authorIdParamValidator,
  authorUpdateValidator,
};
