import express from "express";
import { validateRequest } from "../middlewares/request-validator";
import { requireAuth } from "../middlewares/require-auth";
import { currentUser } from "../middlewares/current-user";
import {
  bookIdParamValidator,
  bookInsertionValidator,
  bookListQueryValidator,
  bookUpdateValidator,
  bulkBookDeleteValidator,
} from "../validators/book-validators";
import { addBook } from "../controllers/book/add-book";
import { listBooks } from "../controllers/book/list-books";
import { getBookDetails } from "../controllers/book/get-book";
import { updateBook } from "../controllers/book/update-book";
import { removeBook } from "../controllers/book/delete-book";
import { bulkRemoveBooks } from "../controllers/book/bulk-delete-books";

const router = express.Router();

router.get(
  "/api/books",
  currentUser,
  requireAuth,
  bookListQueryValidator,
  validateRequest,
  listBooks
);

router.get(
  "/api/books/:bookId",
  currentUser,
  requireAuth,
  bookIdParamValidator,
  getBookDetails
);

router.post(
  "/api/books/create/:authorId",
  currentUser,
  requireAuth,
  bookInsertionValidator,
  validateRequest,
  addBook
);

router.put(
  "/api/books/update/:bookId",
  currentUser,
  requireAuth,
  bookUpdateValidator,
  validateRequest,
  updateBook
);

router.delete(
  "/api/books/delete/:bookId",
  currentUser,
  requireAuth,
  bookIdParamValidator,
  removeBook
);

router.delete(
  "/api/books/delete",
  currentUser,
  requireAuth,
  bulkBookDeleteValidator,
  bulkRemoveBooks
);

export { router as bookRouter };
