import { NextFunction, Request, Response } from "express";
import BadRequestError from "../Errors/BadRequestError";
import UnauthorizedError from "../Errors/UnauthorizedError";
import JsonWebToken from "@/utils/JsonWebToken";
import UserRepository from "@/infra/Database/Repositories/UserRepository";
import { DBOutputUserData } from "@/domain/application/@types/UserTypes";
import UserStatus from "@/domain/core/UserStatus";

const getPayLoad = (req: Request) => {
  const headers = req.headers.authorization;
  if (!headers) {
    throw new BadRequestError("Authorization header");
  }

  const [, token] = headers.split(" ");
  if (!token) {
    throw new UnauthorizedError("Token is required");
  }

  const jwt = new JsonWebToken();
  const tokenPayload = jwt.tokenReader(token);
  return tokenPayload;
};

const authentication = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const tokenPayload = getPayLoad(req);

  const userRepo = new UserRepository();
  const dbUser: DBOutputUserData | null = await userRepo.getOne({
    _id: tokenPayload.id,
  });
  if (!dbUser || dbUser.status == UserStatus.TO_DELETE) {
    throw new UnauthorizedError("Token is not corresponds to valid user.");
  }

  next();
};

export { authentication, getPayLoad };
