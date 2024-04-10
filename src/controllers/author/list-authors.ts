import { Request, Response } from "express";
import { Author } from "../../models/Author";
import { AppDataSource } from "../../data-source";

export const listAuthors = async (req: Request, res: Response) => {
  const authors = await AppDataSource.manager.find(Author);
  res.send(authors);
};
