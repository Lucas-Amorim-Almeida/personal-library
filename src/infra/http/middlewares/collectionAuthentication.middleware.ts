import { NextFunction, Request, Response } from "express";
import UnauthorizedError from "../Errors/UnauthorizedError";
import UserRepository from "@/infra/Database/Repositories/UserRepository";
import { DBOutputUserData } from "@/domain/application/@types/UserTypes";
import UserStatus from "@/domain/core/UserStatus";
import CollectionRepository from "@/infra/Database/Repositories/CollectionRepository";
import { DBOutputCollectionData } from "@/domain/application/@types/CollectionTypes";
import { getPayLoad } from "./authentication.middleware";

const collectionAuthentication = async (
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

  const collectionRepo = new CollectionRepository();
  const dbCollection: DBOutputCollectionData | null =
    await collectionRepo.getOne({
      _id: req.params.id,
    });
  if (dbCollection?.owner !== tokenPayload.id) {
    throw new UnauthorizedError(
      "It is not possible delete an user without be logged in this account.",
    );
  }

  next();
};

export default collectionAuthentication;
