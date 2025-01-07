import Repository from "@/core/Repository";
import UseCase from "../../UseCase";
import InputBoundary from "../../InputBoundary";
import OutputBoundary from "../../OutputBoundary";
import UserStatus from "@/core/UserStatus";
import RemoveUserOutputBoundary from "./RemoveUserOutputBoundary";
import { DBOutputData } from "@/application/@types/applicationTypes";

export default class RemoveUser implements UseCase<{ id: string }, boolean> {
  constructor(readonly repository: Repository) {}

  async execute(
    inputData: InputBoundary<{ id: string }>,
  ): Promise<OutputBoundary<boolean>> {
    const { id } = inputData.get();

    const dbUser: DBOutputData | null = await this.repository.getOne({ id });
    if (!dbUser) {
      throw new Error("User not found.");
    }

    const dbUserStatusChanged: DBOutputData | null =
      await this.repository.update({
        id,
        status: UserStatus.TO_DELETE,
      });
    if (!dbUserStatusChanged) {
      throw new Error("An internal server error has occurred.");
    }

    return new RemoveUserOutputBoundary(dbUserStatusChanged);
  }
}
