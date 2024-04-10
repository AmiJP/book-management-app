import "reflect-metadata";
import "express-async-errors";
import express, { Express } from "express";
import dotenv from "dotenv";
import { userRouter } from "./routes/user";
import { AppDataSource } from "./data-source";
import { DatabaseConnectionError } from "./errors/database-connection-error";
import { errorHandler } from "./middlewares/error-handler";
import cookieSession from "cookie-session";
import { requestLogger } from "./middlewares/request-logger";
import { authorRouter } from "./routes/author";
import { NotFoundError } from "./errors/not-found-error";
import { bookRouter } from "./routes/book";

dotenv.config();
const app: Express = express();
app.set("trust proxy", true);
app.use(express.json());
app.use(requestLogger);
const port = process.env.PORT || 3000;

app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

// routes
app.use(userRouter);
app.use(authorRouter);
app.use(bookRouter);

// Not Found Route
app.use("*", async () => {
  throw new NotFoundError();
});

// Error Handler
app.use(errorHandler);

const start = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!\n");
  } catch (error) {
    console.error(error);
    throw new DatabaseConnectionError();
  }

  app.listen(port, () => {
    console.log(`🚀[server]: Server is running at http://localhost:${port}`);
  });
};

start();
