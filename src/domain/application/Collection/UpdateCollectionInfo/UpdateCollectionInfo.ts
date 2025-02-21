import {
  DBOutputCollectionData,
  InputCollectionInfoUpdate,
} from "@/domain/application/@types/CollectionTypes";
import InputBoundary from "@/domain/application/InputBoundary";
import OutputBoundary from "@/domain/application/OutputBoundary";
import UseCase from "@/domain/application/UseCase";
import Repository from "@/domain/core/Repository";
import CollectionOutputBoundary from "../CollectionOutputBoundary";
import EntityNotFoundError from "../../Errors/EntityNotFoundError";
import InternalError from "../../Errors/InternalError";

export default class UpdateCollectionInfo
  implements UseCase<InputCollectionInfoUpdate, DBOutputCollectionData>
{
  constructor(readonly repository: Repository) {}

  private updateFieldsAssembler(
    dbCollection: DBOutputCollectionData,
    update_fields: {
      title?: string;
      description?: string;
      visibility?: "public" | "private";
    },
  ) {
    return {
      title: update_fields.title ?? dbCollection.title,
      description: update_fields.description ?? dbCollection.description,
      visibility:
        update_fields.visibility ??
        (dbCollection.visibility as "public" | "private"),
    };
  }

  async execute(
    inputData: InputBoundary<InputCollectionInfoUpdate>,
  ): Promise<OutputBoundary<DBOutputCollectionData>[]> {
    const { collection_id, update_fields } = inputData.get();

    const dbCollection: DBOutputCollectionData | null =
      await this.repository.getOne({ _id: collection_id });
    if (!dbCollection) {
      throw new EntityNotFoundError("Collection");
    }

    const updatedCollection: DBOutputCollectionData | null =
      await this.repository.update({
        query: { _id: collection_id },
        update_fields: this.updateFieldsAssembler(dbCollection, update_fields),
      });
    if (!updatedCollection) {
      throw new InternalError();
    }

    return [new CollectionOutputBoundary(updatedCollection)];
  }
}
