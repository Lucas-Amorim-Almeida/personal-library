import { DBOutputCollectionData } from "@/domain/application/@types/CollectionTypes";
import InputBoundary from "@/domain/application/InputBoundary";
import OutputBoundary from "@/domain/application/OutputBoundary";
import UseCase from "@/domain/application/UseCase";
import Repository from "@/domain/core/Repository";
import CollectionOutputBoundary from "../CollectionOutputBoundary";

export default class GetCollectionByID
  implements UseCase<{ collection_id: string }, DBOutputCollectionData>
{
  constructor(readonly repository: Repository) {}

  async execute(
    inputData: InputBoundary<{ collection_id: string }>,
  ): Promise<OutputBoundary<DBOutputCollectionData>[]> {
    const { collection_id } = inputData.get();

    const dbCollection: DBOutputCollectionData | null =
      await this.repository.getOne({ id: collection_id });
    if (!dbCollection) {
      throw new Error("Collection not found.");
    }

    return [new CollectionOutputBoundary(dbCollection)];
  }
}
