import InputBoundary from "@/domain/application/InputBoundary";
import OutputBoundary from "@/domain/application/OutputBoundary";
import UseCase from "@/domain/application/UseCase";
import Repository from "@/domain/core/Repository";
import DeleteBookOutputBoundary from "./DeleteBookOutputBoundary";
import { DBOutputBookData } from "@/domain/application/@types/BookTypes";
import EntityNotFoundError from "../../Errors/EntityNotFoundError";

export default class DeleteBook implements UseCase<{ id: string }, boolean> {
  constructor(readonly repository: Repository) {}

  async execute(
    inputData: InputBoundary<{ id: string }>,
  ): Promise<OutputBoundary<boolean>[]> {
    const { id: _id } = inputData.get();

    const deletedBook = await this.repository.delete({ _id });
    if (!deletedBook) {
      throw new EntityNotFoundError("Book");
    }

    const dbBook: DBOutputBookData | null = await this.repository.getOne({
      _id,
    });

    return [new DeleteBookOutputBoundary(dbBook)];
  }
}
