import { Request, Response } from "express";

export const logoutUser = (req: Request, res: Response) => {
  req.session = null;
  res.send({});
};
