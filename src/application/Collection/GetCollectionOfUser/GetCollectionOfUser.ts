import { DBOutputCollectionData } from "@/application/@types/applicationTypes";
import InputBoundary from "@/application/InputBoundary";
import OutputBoundary from "@/application/OutputBoundary";
import UseCase from "@/application/UseCase";
import Repository from "@/core/Repository";
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
