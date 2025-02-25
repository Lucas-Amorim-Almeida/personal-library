import { NextFunction, Request, Response } from "express";
import HTTPError from "../Errors/HTTPError";

const errorsMiddleWare = (
  error: Error & Partial<HTTPError>,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  //console.log(error.message);
  const statusCode: number = error.statusCode ?? 500;
  const message = error.statusCode
    ? error.message
    : "An internal server error occurred.";

  res.status(statusCode).json({ message: message });

  next();
};

export { errorsMiddleWare };
