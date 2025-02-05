import Repository from "@/domain/core/Repository";
import UseCase from "../../UseCase";
import InputBoundary from "../../InputBoundary";
import OutputBoundary from "../../OutputBoundary";
import UserStatus from "@/domain/core/UserStatus";
import RemoveUserOutputBoundary from "./RemoveUserOutputBoundary";
import { DBOutputUserData } from "@/domain/application/@types/UserTypes";
import NotFoundError from "../../Errors/NotFoundError";
import InternalServerError from "../../Errors/InternalServerError";

export default class RemoveUser implements UseCase<{ id: string }, boolean> {
  constructor(readonly repository: Repository) {}

  async execute(
    inputData: InputBoundary<{ id: string }>,
  ): Promise<OutputBoundary<boolean>[]> {
    const { id } = inputData.get();

    const dbUser: DBOutputUserData | null = await this.repository.getOne({
      id,
    });
    if (!dbUser) {
      throw new NotFoundError("User");
    }

    const dbUserStatusChanged: DBOutputUserData | null =
      await this.repository.update({
        query: { id },
        update_fields: { status: UserStatus.TO_DELETE },
      });
    if (!dbUserStatusChanged) {
      throw new InternalServerError();
    }

    return [new RemoveUserOutputBoundary(dbUserStatusChanged)];
  }
}
