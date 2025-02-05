import InputBoundary from "@/domain/application/InputBoundary";
import InvalidFieldError from "../../Errors/InvalidFieldError";

export default class GetUserByIDInputBoundary
  implements InputBoundary<{ id: string }>
{
  constructor(readonly id: string) {
    if (id === "") {
      throw new InvalidFieldError("ID");
    }
  }
  get(): { id: string } {
    return { id: this.id };
  }
}
