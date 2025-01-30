import { ColletionInputData } from "@/domain/application/@types/CollectionTypes";
import InputBoundary from "@/domain/application/InputBoundary";

export default class CreateCollectionInputBoundary
  implements InputBoundary<ColletionInputData>
{
  private collectionInputData: ColletionInputData;

  constructor(
    inputData: { user_id: string } & Omit<ColletionInputData, "owner">,
  ) {
    if (inputData.title === "") {
      throw new Error("Title is required.");
    }
    if (inputData.collection.length === 0) {
      throw new Error("At least a book id is required.");
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
