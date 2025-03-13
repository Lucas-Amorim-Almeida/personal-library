import { DBOutputUserData } from "@/domain/application/@types/UserTypes";
import UserStatus from "@/domain/core/UserStatus";
import UserRepository from "@/infra/Database/Repositories/UserRepository";
import JsonWebToken from "@/utils/JsonWebToken";
import { NextFunction, Request, Response } from "express";

const defineVisibilityCollectionCatched = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const auth = req.headers.authorization;

  req.body.access_private = false;
  if (auth) {
    const [, token] = auth.split(" ");
    if (token) {
      const jwt = new JsonWebToken();
      const { id } = jwt.tokenReader(token);

      const userRepo = new UserRepository();
      const dbUser: DBOutputUserData | null = await userRepo.getOne({
        _id: id,
      });
      if (dbUser && dbUser.status != UserStatus.TO_DELETE) {
        req.body.access_private = true;
      }
    }
  }

  next();
};

export default defineVisibilityCollectionCatched;
