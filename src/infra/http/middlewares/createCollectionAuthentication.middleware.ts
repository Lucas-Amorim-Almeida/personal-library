import { NextFunction, Request, Response } from "express";
import UnauthorizedError from "../Errors/UnauthorizedError";
import UserRepository from "@/infra/Database/Repositories/UserRepository";
import { DBOutputUserData } from "@/domain/application/@types/UserTypes";
import UserStatus from "@/domain/core/UserStatus";
import { getPayLoad } from "./authentication.middleware";

const createCollectionAuthentication = async (
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

  req.body.user_id = tokenPayload.id;

  next();
};

export default createCollectionAuthentication;
