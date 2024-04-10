import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  BeforeInsert,
} from "typeorm";
import { Password } from "../services/password";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @BeforeInsert()
  // pre-save hook to hash password before saving to db
  async hashPassword() {
    this.password = await Password.toHash(this.password);
  }
  @Column()
  password: string;
}
