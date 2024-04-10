import { Request, Response } from "express";
import { Book } from "../../models/Book";
import { AppDataSource } from "../../data-source";
import { BookNotFoundError } from "../../errors/book-not-found";

export const bulkRemoveBooks = async (req: Request, res: Response) => {
  const bookIds = req.body.bookIds as number[];

  // this will ensure that the transaction is serializable and rollback if any error occurs
  await AppDataSource.manager.transaction(
    "SERIALIZABLE",
    async (transactionalEntityManager) => {
      for (const bookId of bookIds) {
        const book = await transactionalEntityManager.findOneBy(Book, {
          id: bookId,
        });

        if (!book) {
          throw new BookNotFoundError();
        }

        await transactionalEntityManager.remove(book);
      }
    }
  );

  res.send({
    message: "All books deleted successfully",
  });
};
