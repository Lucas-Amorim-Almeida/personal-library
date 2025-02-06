import InputBoundary from "@/domain/application/InputBoundary";
import InvalidFieldError from "../../Errors/InvalidFieldError";

export default class DeleteCollectionInputBoundary
  implements InputBoundary<{ id: string }>
{
  constructor(readonly inputData: { id: string }) {
    if (!inputData.id) {
      throw new InvalidFieldError("Id");
    }
  }

  get(): { id: string } {
    return this.inputData;
  }
}
