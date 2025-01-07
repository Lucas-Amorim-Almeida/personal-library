import Repository from "@/core/Repository";
import UseCase from "../../UseCase";
import UserStatus from "@/core/UserStatus";
import OutputBoundary from "../../OutputBoundary";
import User from "@/core/User";
import InputBoundary from "../../InputBoundary";
import UserStatusUpdateOutputBoundary from "./UserStatusUpdateOutputBoundary";
import { DBOutputData } from "@/application/@types/applicationTypes";

export default class UserStatusUpdate
  implements UseCase<{ id: string; status: UserStatus }, User>
{
  constructor(readonly repository: Repository) {}

  async execute(
    inputData: InputBoundary<{ id: string; status: UserStatus }>,
  ): Promise<OutputBoundary<User>> {
    const { id, status } = inputData.get();

    const dbUser: DBOutputData | null = await this.repository.getOne({ id });
    if (!dbUser) {
      throw new Error("User not found.");
    }

    const dbUserStatusChanged: DBOutputData | null =
      await this.repository.update({ id, status });
    if (!dbUserStatusChanged) {
      throw new Error("An internal server error has occurred.");
    }

    return new UserStatusUpdateOutputBoundary(dbUserStatusChanged);
  }
}
