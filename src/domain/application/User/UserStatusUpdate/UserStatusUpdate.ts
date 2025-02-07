import Repository from "@/domain/core/Repository";

import UserStatus from "@/domain/core/UserStatus";
import OutputBoundary from "../../OutputBoundary";
import InputBoundary from "../../InputBoundary";
import UserOutputBoundary from "../UserOutputBoundary";
import { DBOutputUserData } from "@/domain/application/@types/UserTypes";
import UseCase from "../../UseCase";
import EntityNotFoundError from "../../Errors/EntityNotFoundError";
import InternalError from "../../Errors/InternalError";

export default class UserStatusUpdate
  implements UseCase<{ id: string; status: UserStatus }, DBOutputUserData>
{
  constructor(readonly repository: Repository) {}

  async execute(
    inputData: InputBoundary<{ id: string; status: UserStatus }>,
  ): Promise<OutputBoundary<DBOutputUserData>[]> {
    const { id, status } = inputData.get();

    const dbUser: DBOutputUserData | null = await this.repository.getOne({
      id,
    });
    if (!dbUser) {
      throw new EntityNotFoundError("User");
    }

    const dbUserStatusChanged: DBOutputUserData | null =
      await this.repository.update({ id, status });
    if (!dbUserStatusChanged) {
      throw new InternalError();
    }

    return [new UserOutputBoundary(dbUserStatusChanged)];
  }
}
