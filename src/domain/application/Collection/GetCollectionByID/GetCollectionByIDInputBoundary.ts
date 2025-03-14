import InputBoundary from "@/domain/application/InputBoundary";
import InvalidFieldError from "../../Errors/InvalidFieldError";

export default class GetCollectionByIDInputBoundary
  implements InputBoundary<{ collection_id: string }>
{
  constructor(private readonly inputData: { collection_id: string }) {
    if (!inputData.collection_id) {
      throw new InvalidFieldError("Collection id");
    }
  }

  get(): { collection_id: string } {
    return this.inputData;
  }
}
