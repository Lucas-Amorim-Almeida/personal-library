import { NextFunction, Request, Response } from "express";
import UnauthorizedError from "../Errors/UnauthorizedError";
import UserRepository from "@/infra/Database/Repositories/UserRepository";
import { DBOutputUserData } from "@/domain/application/@types/UserTypes";
import UserStatus from "@/domain/core/UserStatus";
import AccessLevel from "@/domain/core/AccessLevel";
import { getPayLoad } from "./authentication.middleware";

const userUpdateStatusAuthention = async (
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

  if (
    (req.body.status == UserStatus.BANNED ||
      req.body.status == UserStatus.SUSPENDED) &&
    tokenPayload.access_level != AccessLevel.ADMINISTRATOR
  ) {
    throw new UnauthorizedError(
      "The user has not permition to do this operation.",
    );
  }

  next();
};

export default userUpdateStatusAuthention;
