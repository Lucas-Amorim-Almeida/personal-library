import { NextFunction, Request, Response } from "express";
import UnauthorizedError from "../Errors/UnauthorizedError";
import UserRepository from "@/infra/Database/Repositories/UserRepository";
import { DBOutputUserData } from "@/domain/application/@types/UserTypes";
import { getPayLoad } from "./authentication.middleware";
import { DBOutputBookData } from "@/domain/application/@types/BookTypes";
import BookRepository from "@/infra/Database/Repositories/BookRepository";
import NotFoundError from "../Errors/NotFoundError";

const bookAuthentication = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const tokenPayload = getPayLoad(req);

  const userRepo = new UserRepository();
  const dbUser: DBOutputUserData | null = await userRepo.getOne({
    _id: tokenPayload.id,
  });
  if (!dbUser) {
    throw new UnauthorizedError("Token is not corresponds to valid user.");
  }

  const bookId = req.params.id;
  const bookRepo = new BookRepository();
  const dbBook: DBOutputBookData | null = await bookRepo.getOne({
    _id: bookId,
  });

  if (!dbBook) {
    throw new NotFoundError("Book");
  }

  if (tokenPayload.id !== dbBook.inserted_by) {
    throw new UnauthorizedError(
      "The user has not permition to do this operation.",
    );
  }

  next();
};

export default bookAuthentication;
