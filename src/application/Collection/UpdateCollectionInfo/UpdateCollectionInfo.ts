import {
  DBOutputCollectionData,
  InputCollectionInfoUpdate,
} from "@/application/@types/applicationTypes";
import InputBoundary from "@/application/InputBoundary";
import OutputBoundary from "@/application/OutputBoundary";
import UseCase from "@/application/UseCase";
import Repository from "@/core/Repository";
import CollectionOutputBoundary from "../CollectionOutputBoundary";

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
      throw new Error("Collection not found.");
    }

    const updatedCollection: DBOutputCollectionData | null =
      await this.repository.update({
        id: colletion_id,
        update_fields,
      });
    if (!updatedCollection) {
      throw new Error("An internal server error occurred.");
    }

    return [new CollectionOutputBoundary(updatedCollection)];
  }
}
