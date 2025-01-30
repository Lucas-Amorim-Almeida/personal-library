import { DBOutputCollectionData } from "@/domain/application/@types/CollectionTypes";
import InputBoundary from "@/domain/application/InputBoundary";
import OutputBoundary from "@/domain/application/OutputBoundary";
import UseCase from "@/domain/application/UseCase";
import Repository from "@/domain/core/Repository";
import DeleteCollectionOutputBoundary from "./DeleteCollectionOutputBoundary";

export default class DeleteCollection
  implements UseCase<{ id: string }, boolean>
{
  constructor(readonly repository: Repository) {}

  async execute(
    inputData: InputBoundary<{ id: string }>,
  ): Promise<OutputBoundary<boolean>[]> {
    const { id } = inputData.get();

    this.repository.delete({ id });

    const dbCollection: DBOutputCollectionData | null =
      await this.repository.getOne({ id });

    return [new DeleteCollectionOutputBoundary(dbCollection)];
  }
}
