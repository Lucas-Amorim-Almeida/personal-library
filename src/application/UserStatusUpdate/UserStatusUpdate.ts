import UserRepository from "@/core/repositories/UserRepository";
import UseCase from "../UseCase";
import UserStatus from "@/core/UserStatus";
import OutputBoundary from "../OutputBoundary";
import User from "@/core/User";
import InputBoundary from "../InputBondary";
import UserStatusUpdateOutputBoundary from "./UserStatusUpdateOutputBoundary";

type DBOutputData = {
  id: string;
  status: string;
  username: string;
  password: string;
  access_level: string;
  created_at?: Date;
  updated_at?: Date;
};

export default class UserStatusUpdate
  implements UseCase<{ id: string; status: UserStatus }, User>
{
  constructor(readonly repository: UserRepository) {}

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
