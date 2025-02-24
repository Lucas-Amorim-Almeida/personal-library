import InputBoundary from "@/domain/application/InputBoundary";
import InvalidFieldError from "../../Errors/InvalidFieldError";

export default class GetUserByIDInputBoundary
  implements InputBoundary<{ id: string }>
{
  constructor(readonly inputData: { id: string }) {
    const { id } = inputData;
    if (id === "") {
      throw new InvalidFieldError("ID");
    }
  }
  get(): { id: string } {
    return this.inputData;
  }
}
