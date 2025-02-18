import InputBoundary from "@/domain/application/InputBoundary";
import FieldRequiredError from "../../Errors/FieldRequiredError";
import InvalidFieldError from "../../Errors/InvalidFieldError";

export default class SearchBookInputBoundary
  implements
    InputBoundary<{
      title?: string;
      author?: string;
      take?: number;
    }>
{
  constructor(
    readonly inputData: {
      title?: string;
      author?: string;
      take?: number;
    },
  ) {
    if (!inputData.title && !inputData.author) {
      throw new FieldRequiredError("At least one of title or author");
    }
    if (inputData.take !== undefined && inputData.take <= 0) {
      throw new InvalidFieldError("take param");
    }
  }

  get(): { title?: string; author?: string; take?: number } {
    return this.inputData;
  }
}
