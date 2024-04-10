import { CustomError } from "./custom-error";

export class BookNotFoundError extends CustomError {
  statusCode = 404;
  reason = "Book not found";

  constructor() {
    super("Book not found");

    Object.setPrototypeOf(this, BookNotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
