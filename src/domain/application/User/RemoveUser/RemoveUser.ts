import Repository from "@/domain/core/Repository";
import UseCase from "../../UseCase";
import InputBoundary from "../../InputBoundary";
import OutputBoundary from "../../OutputBoundary";
import UserStatus from "@/domain/core/UserStatus";
import RemoveUserOutputBoundary from "./RemoveUserOutputBoundary";
import { DBOutputUserData } from "@/domain/application/@types/UserTypes";
import EntityNotFoundError from "../../Errors/EntityNotFoundError";
import InternalError from "../../Errors/InternalError";

export default class RemoveUser implements UseCase<{ id: string }, boolean> {
  constructor(readonly repository: Repository) {}

  async execute(
    inputData: InputBoundary<{ id: string }>,
  ): Promise<OutputBoundary<boolean>[]> {
    const { id: _id } = inputData.get();

    const dbUser: DBOutputUserData | null = await this.repository.getOne({
      _id,
    });
    if (!dbUser) {
      throw new EntityNotFoundError("User");
    }

    const dbUserStatusChanged: DBOutputUserData | null =
      await this.repository.update({
        query: { _id },
        update_fields: { status: UserStatus.TO_DELETE },
      });
    if (!dbUserStatusChanged) {
      throw new InternalError();
    }

    return [new RemoveUserOutputBoundary(dbUserStatusChanged)];
  }
}
