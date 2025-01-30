import Repository from "@/domain/core/Repository";

import UserStatus from "@/domain/core/UserStatus";
import OutputBoundary from "../../OutputBoundary";
import User from "@/domain/core/User";
import InputBoundary from "../../InputBoundary";
import UserOutputBoundary from "../UserOutputBoundary";
import { DBOutputUserData } from "@/domain/application/@types/UserTypes";
import UseCase from "../../UseCase";

export default class UserStatusUpdate
  implements UseCase<{ id: string; status: UserStatus }, User>
{
  constructor(readonly repository: Repository) {}

  async execute(
    inputData: InputBoundary<{ id: string; status: UserStatus }>,
  ): Promise<OutputBoundary<User>[]> {
    const { id, status } = inputData.get();

    const dbUser: DBOutputUserData | null = await this.repository.getOne({
      id,
    });
    if (!dbUser) {
      throw new Error("User not found.");
    }

    const dbUserStatusChanged: DBOutputUserData | null =
      await this.repository.update({ id, status });
    if (!dbUserStatusChanged) {
      throw new Error("An internal server error has occurred.");
    }

    return [new UserOutputBoundary(dbUserStatusChanged)];
  }
}
