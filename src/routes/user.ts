import express from "express";
import { registerUser } from "../controllers/user/register";
import { loginUser } from "../controllers/user/login";
import { getCurrentUser } from "../controllers/user/current-user";
import {
  signinValidator,
  signupValidator,
} from "../validators/user-validators";
import { validateRequest } from "../middlewares/request-validator";
import { logoutUser } from "../controllers/user/logout";
import { currentUser } from "../middlewares/current-user";

const router = express.Router();

router.post(
  "/api/users/signup",
  signupValidator,
  validateRequest,
  registerUser
);

router.post("/api/users/signin", signinValidator, validateRequest, loginUser);

router.post("/api/users/signout", logoutUser);

router.get("/api/users/currentuser", currentUser, getCurrentUser);

export { router as userRouter };
