import { DBOutputCollectionData } from "@/domain/application/@types/CollectionTypes";
import InputBoundary from "@/domain/application/InputBoundary";
import OutputBoundary from "@/domain/application/OutputBoundary";
import UseCase from "@/domain/application/UseCase";
import Repository from "@/domain/core/Repository";
import CollectionOutputBoundary from "../CollectionOutputBoundary";

export default class GetCollectionOfUser
  implements UseCase<{ user_id: string }, DBOutputCollectionData>
{
  constructor(readonly repository: Repository) {}

  async execute(
    inputData: InputBoundary<{ user_id: string }>,
  ): Promise<OutputBoundary<DBOutputCollectionData>[]> {
    const { user_id } = inputData.get();

    const dbCollections: DBOutputCollectionData[] =
      await this.repository.getMany({ owner: user_id });

    const dbCollectionsOutput = dbCollections.map(
      (collection) => new CollectionOutputBoundary(collection),
    );
    return dbCollectionsOutput;
  }
}
