import { DataSource } from "typeorm";
import { User } from "./models/User";
import path from "path";
import { Author } from "./models/Author";
import { Book } from "./models/Book";

const __IS_DEV__ = process.env.NODE_ENV === "development";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: path.join(__dirname, "database/db.sqlite"),
  synchronize: __IS_DEV__,
  logging: false, //__IS_DEV__, // set to true to see SQL logs
  entities: [User, Author, Book],
  subscribers: [],
  migrations: [],
});
