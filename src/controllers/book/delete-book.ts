import { Request, Response } from "express";
import { Book } from "../../models/Book";
import { AppDataSource } from "../../data-source";
import { BookNotFoundError } from "../../errors/book-not-found";

export const removeBook = async (req: Request, res: Response) => {
  const bookId = +req.params.bookId;
  const bookRepository = AppDataSource.manager.getRepository(Book);

  const book = await bookRepository.findOneBy({
    id: bookId,
  });

  if (!book) {
    throw new BookNotFoundError();
  }

  await bookRepository.remove(book);

  res.send({
    message: "Book deleted successfully",
  });
};
