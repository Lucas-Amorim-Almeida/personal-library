import { NextFunction, Request, Response } from "express";
import UnauthorizedError from "../Errors/UnauthorizedError";
import UserRepository from "@/infra/Database/Repositories/UserRepository";
import { DBOutputUserData } from "@/domain/application/@types/UserTypes";
import UserStatus from "@/domain/core/UserStatus";
import { getPayLoad } from "./authentication.middleware";

const authenticationIdValidation = async (
  req: Request,
  res: Response,
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

  if (req.params.id !== tokenPayload.id) {
    throw new UnauthorizedError(
      "It is not possible delete an user without be logged in this account.",
    );
  }

  next();
};

export default authenticationIdValidation;
