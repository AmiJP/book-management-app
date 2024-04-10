import express from "express";
import { validateRequest } from "../middlewares/request-validator";
import {
  authorIdParamValidator,
  authorInsertionValidator,
  authorUpdateValidator,
} from "../validators/author-validators";
import { addAuthor } from "../controllers/author/add-author";
import { removeAuthor } from "../controllers/author/delete-author";
import { listAuthors } from "../controllers/author/list-authors";
import { getAuthorDetails } from "../controllers/author/get-author";
import { requireAuth } from "../middlewares/require-auth";
import { currentUser } from "../middlewares/current-user";
import { updateAuthor } from "../controllers/author/update-author";

const router = express.Router();

router.get("/api/authors", currentUser, requireAuth, listAuthors);

router.get(
  "/api/authors/:authorId",
  currentUser,
  requireAuth,
  authorIdParamValidator,
  getAuthorDetails
);

router.post(
  "/api/authors/create",
  currentUser,
  requireAuth,
  authorInsertionValidator,
  validateRequest,
  addAuthor
);

router.put(
  "/api/authors/update/:authorId",
  currentUser,
  requireAuth,
  authorUpdateValidator,
  validateRequest,
  updateAuthor
);

router.delete(
  "/api/authors/delete/:authorId",
  currentUser,
  requireAuth,
  authorIdParamValidator,
  removeAuthor
);

export { router as authorRouter };
