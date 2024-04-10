import { Request, Response } from "express";
import { Author } from "../../models/Author";
import { AppDataSource } from "../../data-source";

export const addAuthor = async (req: Request, res: Response) => {
  const { author, born, city } = req.body;

  const newAuthor = new Author();
  newAuthor.author = author;
  newAuthor.born = born;
  newAuthor.city = city;

  const authorData = await AppDataSource.manager.save(newAuthor);

  res.status(201).send(authorData);
};
