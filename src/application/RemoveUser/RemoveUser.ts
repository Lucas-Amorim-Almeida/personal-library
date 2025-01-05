import UserRepository from "@/core/repositories/UserRepository";
import UseCase from "../UseCase";
import InputBoundary from "../InputBondary";
import OutputBoundary from "../OutputBoundary";
import UserStatus from "@/core/UserStatus";
import RemoveUserOutputBoundary from "./RemoveUserOutputBoundary";

type dbOutputData = {
  id: string;
  status: string;
  username: string;
  password: string;
  access_level: string;
  created_at?: Date;
  updated_at?: Date;
};

export default class RemoveUser implements UseCase<{ id: string }, boolean> {
  constructor(readonly repository: UserRepository) {}

  async execute(
    inputData: InputBoundary<{ id: string }>,
  ): Promise<OutputBoundary<boolean>> {
    const { id } = inputData.get();

    const dbUser: dbOutputData | null = await this.repository.getOne({ id });
    if (!dbUser) {
      throw new Error("User not found.");
    }

    const dbUserStatusChanged: dbOutputData | null =
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
