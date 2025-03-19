import InputBoundary from "@/domain/application/InputBoundary";
import InvalidFieldError from "../../Errors/InvalidFieldError";

export default class GetCollectionByIDInputBoundary
  implements InputBoundary<{ collection_id: string; access_private: boolean }>
{
  constructor(
    private readonly inputData: {
      collection_id: string;
      access_private: boolean;
    },
  ) {
    if (!inputData.collection_id) {
      throw new InvalidFieldError("Collection id");
    }
  }

  get(): { collection_id: string; access_private: boolean } {
    return this.inputData;
  }
}
