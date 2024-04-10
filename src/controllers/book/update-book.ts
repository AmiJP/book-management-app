import { Request, Response } from "express";
import { Book } from "../../models/Book";
import { AppDataSource } from "../../data-source";
import { BookNotFoundError } from "../../errors/book-not-found";

export const updateBook = async (req: Request, res: Response) => {
  const bookId = +req.params.bookId;
  const { title, yearPublished, genre } = req.body;

  const bookRepository = AppDataSource.manager.getRepository(Book);

  const bookData = await bookRepository.findOneBy({
    id: bookId,
  });

  if (!bookData) {
    throw new BookNotFoundError();
  }

  bookData.title = title || bookData.title;
  bookData.yearPublished = yearPublished || bookData.yearPublished;
  bookData.genre = genre || bookData.genre;

  await bookRepository.save(bookData);

  res.status(200).send(bookData);
};
