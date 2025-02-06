import {
  DBOutputCollectionData,
  InputCollectionInfoUpdate,
} from "@/domain/application/@types/CollectionTypes";
import InputBoundary from "@/domain/application/InputBoundary";
import OutputBoundary from "@/domain/application/OutputBoundary";
import UseCase from "@/domain/application/UseCase";
import Repository from "@/domain/core/Repository";
import CollectionOutputBoundary from "../CollectionOutputBoundary";
import NotFoundError from "../../Errors/NotFoundError";
import InternalServerError from "../../Errors/InternalServerError";

export default class UpdateCollectionInfo
  implements UseCase<InputCollectionInfoUpdate, DBOutputCollectionData>
{
  constructor(readonly repository: Repository) {}

  async execute(
    inputData: InputBoundary<InputCollectionInfoUpdate>,
  ): Promise<OutputBoundary<DBOutputCollectionData>[]> {
    const { colletion_id, update_fields } = inputData.get();

    const dbCollection: DBOutputCollectionData | null =
      await this.repository.getOne({ id: colletion_id });
    if (!dbCollection) {
      throw new NotFoundError("Collection");
    }

    const updatedCollection: DBOutputCollectionData | null =
      await this.repository.update({
        id: colletion_id,
        update_fields,
      });
    if (!updatedCollection) {
      throw new InternalServerError();
    }

    return [new CollectionOutputBoundary(updatedCollection)];
  }
}
