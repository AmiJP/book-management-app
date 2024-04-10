import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { Book } from "./Book";

@Entity()
export class Author extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  author: string;

  @Column("date")
  born: Date;

  @Column()
  city: string;

  @OneToMany(() => Book, (book) => book.author)
  books: Book[];
}
