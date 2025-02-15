import InputBoundary from "@/domain/application/InputBoundary";
import FieldRequiredError from "../../Errors/FieldRequiredError";

export default class GetBookByIdInputBoundary
  implements InputBoundary<{ id: string }>
{
  constructor(readonly inputData: { id: string }) {
    if (inputData.id === "") {
      throw new FieldRequiredError("Id");
    }
  }

  get(): { id: string } {
    return this.inputData;
  }
}
