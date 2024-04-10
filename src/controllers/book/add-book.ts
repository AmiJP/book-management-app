import { Request, Response } from "express";
import { Book } from "../../models/Book";
import { AppDataSource } from "../../data-source";
import { Author } from "../../models/Author";
import { AuthorNotFoundError } from "../../errors/author-not-found";

export const addBook = async (req: Request, res: Response) => {
  const authorId = +req.params.authorId;
  const { title, yearPublished, genre } = req.body;

  const authorRepository = AppDataSource.manager.getRepository(Author);

  const author = await authorRepository.findOneBy({
    id: authorId,
  });

  if (!author) {
    throw new AuthorNotFoundError();
  }

  const newBook = new Book();
  newBook.title = title;
  newBook.author = author;
  newBook.yearPublished = yearPublished;
  newBook.genre = genre;

  const bookData = await AppDataSource.manager.save(newBook);

  res.status(201).send(bookData);
};
