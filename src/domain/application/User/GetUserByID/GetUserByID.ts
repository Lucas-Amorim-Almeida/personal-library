import InputBoundary from "@/domain/application/InputBoundary";
import OutputBoundary from "@/domain/application/OutputBoundary";
import UseCase from "@/domain/application/UseCase";
import Repository from "@/domain/core/Repository";
import UserOutputBoundary from "../UserOutputBoundary";
import { DBOutputUserData } from "@/domain/application/@types/UserTypes";
import EntityNotFoundError from "../../Errors/EntityNotFoundError";

export default class GetUserByID
  implements UseCase<{ id: string }, DBOutputUserData>
{
  constructor(readonly repository: Repository) {}

  async execute(
    inputData: InputBoundary<{ id: string }>,
  ): Promise<OutputBoundary<DBOutputUserData>[]> {
    const { id } = inputData.get();

    const dbUser: DBOutputUserData | null = await this.repository.getOne({
      _id: id,
    });
    if (!dbUser) {
      throw new EntityNotFoundError("User");
    }

    return [new UserOutputBoundary(dbUser)];
  }
}
