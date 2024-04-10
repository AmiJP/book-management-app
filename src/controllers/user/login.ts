import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../../models/User";
import { Password } from "../../services/password";
import { BadRequestError } from "../../errors/bad-request-error";

import { AppDataSource } from "../../data-source";

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const userReporitory = AppDataSource.getRepository(User);

  const existingUser = await userReporitory.findOneBy({
    email,
  });

  if (!existingUser) {
    throw new BadRequestError("Invalid credentials");
  }

  const passwordsMatch = await Password.compare(
    existingUser.password,
    password
  );

  if (!passwordsMatch) {
    throw new BadRequestError("Invalid credentials");
  }

  // Generate JWT
  const userJwt = jwt.sign(
    {
      id: existingUser.id,
      email: existingUser.email,
    },
    process.env.JWT_KEY!,
    {
      expiresIn: "1h",
    }
  );
  // store it on the session object
  req.session = { jwt: userJwt };

  return res.status(200).send({
    id: existingUser.id,
    email: existingUser.email,
  });
};
