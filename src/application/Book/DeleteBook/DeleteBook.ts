import { DBOutputBookData } from "@/application/@types/applicationTypes";
import InputBoundary from "@/application/InputBoundary";
import OutputBoundary from "@/application/OutputBoundary";
import UseCase from "@/application/UseCase";
import Repository from "@/core/Repository";
import DeleteBookOutputBoundary from "./DeleteBookOutputBoundary";

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
