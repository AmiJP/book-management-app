import { Request, Response } from "express";
import { Author } from "../../models/Author";
import { AppDataSource } from "../../data-source";
import { AuthorNotFoundError } from "../../errors/author-not-found";

export const getAuthorDetails = async (req: Request, res: Response) => {
  const authorId = +req.params.authorId;
  const authorRepository = AppDataSource.manager.getRepository(Author);

  const author = await authorRepository.findOneBy({
    id: authorId,
  });

  if (!author) {
    throw new AuthorNotFoundError();
  }

  res.send(author);
};
