import { NextFunction, Request, Response } from "express";
import { getPayLoad } from "./authentication.middleware";

const bookCreation = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const tokenPayload = getPayLoad(req);

  req.body.inserted_by = tokenPayload.id;

  next();
};

export default bookCreation;
