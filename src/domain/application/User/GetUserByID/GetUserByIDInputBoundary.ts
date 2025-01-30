import InputBoundary from "@/domain/application/InputBoundary";

export default class GetUserByIDInputBoundary
  implements InputBoundary<{ id: string }>
{
  constructor(readonly id: string) {
    if (id === "") {
      throw new Error("ID is not valid.");
    }
  }
  get(): { id: string } {
    return { id: this.id };
  }
}
