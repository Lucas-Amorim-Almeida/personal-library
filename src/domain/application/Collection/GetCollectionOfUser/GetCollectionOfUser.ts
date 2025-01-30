import { DBOutputCollectionData } from "@/domain/application/@types/CollectionTypes";
import InputBoundary from "@/domain/application/InputBoundary";
import OutputBoundary from "@/domain/application/OutputBoundary";
import UseCase from "@/domain/application/UseCase";
import Repository from "@/domain/core/Repository";
import CollectionOutputBoundary from "../CollectionOutputBoundary";

export default class GetCollectionOfUser
  implements UseCase<{ owner: string }, DBOutputCollectionData>
{
  constructor(readonly repository: Repository) {}

  async execute(
    inputData: InputBoundary<{ owner: string }>,
  ): Promise<OutputBoundary<DBOutputCollectionData>[]> {
    const { owner } = inputData.get();

    const dbCollections: DBOutputCollectionData[] =
      await this.repository.getAll({ owner });

    const dbCollectionsOutput = dbCollections.map(
      (collection) => new CollectionOutputBoundary(collection),
    );
    return dbCollectionsOutput;
  }
}
