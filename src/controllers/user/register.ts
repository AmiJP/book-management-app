import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../../models/User";
import { AppDataSource } from "../../data-source";
import { BadRequestError } from "../../errors/bad-request-error";

export const registerUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const userReporitory = AppDataSource.getRepository(User);

  const existingUser = await userReporitory.findOneBy({
    email,
  });

  if (existingUser) {
    throw new BadRequestError("Email is already in use");
  }

  const user = userReporitory.create({
    email,
    password,
  });
  await user.save();

  // Generate JWT
  const userJwt = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_KEY,
    {
      expiresIn: "1h",
    }
  );
  // store it on the session object
  req.session = { jwt: userJwt };

  res.status(201).send({
    id: user.id,
    email: user.email,
  });
};
