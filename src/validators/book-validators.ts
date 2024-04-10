import { body, param, query } from "express-validator";
import { authorIdParamValidator } from "./author-validators";

const bookIdParamValidator = [
  param("bookId")
    .notEmpty()
    .isInt()
    .withMessage("Book ID is required and must be an integer"),
];
const bookListQueryValidator = [
  query("city")
    .optional()
    .isLength({ min: 2 })
    .withMessage("Please provide a valid city"),
  // require none or both from and to dates
  query("from")
    .optional()
    .custom((value, { req }) => {
      if (value && !req.query.to) {
        throw new Error("Please provide a to date for the date range.");
      }
      return true;
    }),
  query("to")
    .optional()
    .custom((value, { req }) => {
      if (value && !req.query.from) {
        throw new Error("Please provide a from date for the date range.");
      }

      if (value && new Date(value) < new Date(req.query.from)) {
        throw new Error("To date must be greater than the from date.");
      }

      return true;
    }),
];

const bookInsertionValidator = [
  ...authorIdParamValidator,
  body("title")
    .isString()
    .isLength({ min: 1 })
    .withMessage("Title is required"),
  // yearPublished must be a valid year between 1900 and current year
  body("yearPublished")
    .isInt({ min: 1900, max: new Date().getFullYear() })
    .withMessage("Published year must be a valid year"),
  body("genre")
    .isString()
    .isLength({ min: 1 })
    .withMessage("Genre is required"),
];

const bookUpdateValidator = [
  ...bookIdParamValidator,
  body("title")
    .isString()
    .isLength({ min: 1 })
    .optional()
    .withMessage("Title is required"),
  body("yearPublished")
    .isInt({ min: 1900, max: new Date().getFullYear() })
    .optional()
    .withMessage("Published year must be a valid year"),
  body("genre")
    .isString()
    .isLength({ min: 1 })
    .optional()
    .withMessage("Genre is required"),
];

const bulkBookDeleteValidator = [
  body("bookIds").isArray({ min: 1 }).withMessage("Book IDs are required"),
];

export {
  bookInsertionValidator,
  bookIdParamValidator,
  bookUpdateValidator,
  bulkBookDeleteValidator,
  bookListQueryValidator,
};
