import { DBOutputCollectionData } from "@/domain/application/@types/CollectionTypes";
import InputBoundary from "@/domain/application/InputBoundary";
import OutputBoundary from "@/domain/application/OutputBoundary";
import UseCase from "@/domain/application/UseCase";
import Repository from "@/domain/core/Repository";
import CollectionOutputBoundary from "../CollectionOutputBoundary";

export default class GetCollectionOfUser
  implements
    UseCase<
      { user_id: string; access_private: boolean },
      DBOutputCollectionData
    >
{
  constructor(readonly repository: Repository) {}

  async execute(
    inputData: InputBoundary<{ user_id: string; access_private: boolean }>,
  ): Promise<OutputBoundary<DBOutputCollectionData>[]> {
    const { user_id, access_private } = inputData.get();

    const dbCollections: DBOutputCollectionData[] =
      await this.repository.getMany({ owner: user_id });

    const dbCollectionsOutput = dbCollections
      .filter(
        (collection) => access_private || collection.visibility === "public",
      )
      .map((collection) => new CollectionOutputBoundary(collection));

    return dbCollectionsOutput;
  }
}
