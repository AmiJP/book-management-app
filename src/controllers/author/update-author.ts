import { Request, Response } from "express";
import { Author } from "../../models/Author";
import { AppDataSource } from "../../data-source";
import { AuthorNotFoundError } from "../../errors/author-not-found";

export const updateAuthor = async (req: Request, res: Response) => {
  const { author, born, city } = req.body;
  const authorId = +req.params.authorId;

  const authorRepository = AppDataSource.manager.getRepository(Author);

  const authorData = await authorRepository.findOneBy({
    id: authorId,
  });

  if (!authorData) {
    throw new AuthorNotFoundError();
  }

  authorData.author = author || authorData.author;
  authorData.born = born || authorData.born;
  authorData.city = city || authorData.city;

  await authorRepository.save(authorData);

  res.status(200).send(authorData);
};
