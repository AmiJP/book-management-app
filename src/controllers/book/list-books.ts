import { Request, Response } from "express";
import { Book } from "../../models/Book";
import { AppDataSource } from "../../data-source";
import { Between, Raw } from "typeorm";

export const listBooks = async (req: Request, res: Response) => {
  try {
    const { city, from, to } = req.query;

    const fromYear = new Date(from as string).getFullYear() || 0;
    const toYear =
      new Date(to as string).getFullYear() || new Date().getFullYear();
    const bookRepository = AppDataSource.manager.getRepository(Book);

    // get books with author relation and filter by city and year range if provided
    const books = await bookRepository.find({
      relations: {
        author: true,
      },
      where: {
        author: {
          city: city as string,
        },
        yearPublished: Between(fromYear, toYear),
      },
    });

    res.send(books);
  } catch (error) {
    console.error(error);
  }
};
