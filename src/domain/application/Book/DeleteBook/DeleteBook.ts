import InputBoundary from "@/domain/application/InputBoundary";
import OutputBoundary from "@/domain/application/OutputBoundary";
import UseCase from "@/domain/application/UseCase";
import Repository from "@/domain/core/Repository";
import DeleteBookOutputBoundary from "./DeleteBookOutputBoundary";
import { DBOutputBookData } from "@/domain/application/@types/BookTypes";

export default class DeleteBook implements UseCase<{ id: string }, boolean> {
  constructor(readonly repository: Repository) {}

  async execute(
    inputData: InputBoundary<{ id: string }>,
  ): Promise<OutputBoundary<boolean>[]> {
    const { id } = inputData.get();

    await this.repository.delete({ id });

    const dbBook: DBOutputBookData | null = await this.repository.getOne({
      id,
    });

    return [new DeleteBookOutputBoundary(dbBook)];
  }
}
