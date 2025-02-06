import { ColletionInputData } from "@/domain/application/@types/CollectionTypes";
import InputBoundary from "@/domain/application/InputBoundary";
import FieldRequiredError from "../../Errors/FieldRequiredError";

export default class CreateCollectionInputBoundary
  implements InputBoundary<ColletionInputData>
{
  private collectionInputData: ColletionInputData;

  constructor(
    inputData: { user_id: string } & Omit<ColletionInputData, "owner">,
  ) {
    if (inputData.title === "") {
      throw new FieldRequiredError("Title");
    }
    if (inputData.collection.length === 0) {
      throw new FieldRequiredError("At least a book id");
    }

    this.collectionInputData = {
      title: inputData.title,
      description: inputData.description,
      visibility: inputData.visibility,
      collection: inputData.collection,
      owner: inputData.user_id,
    };
  }

  get(): ColletionInputData {
    return this.collectionInputData;
  }
}
