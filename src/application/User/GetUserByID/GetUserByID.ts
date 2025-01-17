import { DBOutputUserData } from "@/application/@types/applicationTypes";
import InputBoundary from "@/application/InputBoundary";
import OutputBoundary from "@/application/OutputBoundary";
import UseCase from "@/application/UseCase";
import Repository from "@/core/Repository";
import User from "@/core/User";
import UserOutputBoundary from "../UserOutputBoundary";

export default class GetUserByID implements UseCase<{ id: string }, User> {
  constructor(readonly repository: Repository) {}

  async execute(
    inputData: InputBoundary<{ id: string }>,
  ): Promise<OutputBoundary<User>> {
    const { id } = inputData.get();

    const dbUser: DBOutputUserData | null = await this.repository.getOne({
      id,
    });
    if (!dbUser) {
      throw new Error("User not found.");
    }

    return new UserOutputBoundary(dbUser);
  }
}
