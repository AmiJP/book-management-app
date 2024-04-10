import { CustomError } from "./custom-error";

export class AuthorNotFoundError extends CustomError {
  statusCode = 404;
  reason = "Author not found";

  constructor() {
    super("Author not found");

    Object.setPrototypeOf(this, AuthorNotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
