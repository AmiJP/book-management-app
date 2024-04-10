import { Request, Response } from "express";
import { Book } from "../../models/Book";
import { AppDataSource } from "../../data-source";
import { BookNotFoundError } from "../../errors/book-not-found";

export const getBookDetails = async (req: Request, res: Response) => {
  const bookId = +req.params.bookId;
  const bookRepository = AppDataSource.manager.getRepository(Book);

  const book = await bookRepository.findOne({
    where: {
      id: bookId,
    },
    relations: {
      author: true,
    },
  });

  if (!book) {
    throw new BookNotFoundError();
  }

  res.send(book);
};
