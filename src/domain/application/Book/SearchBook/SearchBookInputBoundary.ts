import InputBoundary from "@/domain/application/InputBoundary";
import FieldRequiredError from "../../Errors/FieldRequiredError";
import InvalidFieldError from "../../Errors/InvalidFieldError";

export default class SearchBookInputBoundary
  implements InputBoundary<{ query: string; take: number }>
{
  constructor(readonly inputData: { query: string; take: number }) {
    if (inputData.query === "") {
      throw new FieldRequiredError("query");
    }
    if (inputData.take <= 0) {
      throw new InvalidFieldError("take param");
    }
  }

  get(): { query: string; take: number } {
    return this.inputData;
  }
}
