import InputBoundary from "@/domain/application/InputBoundary";

export default class DeleteBookInputBoundary
  implements InputBoundary<{ id: string }>
{
  constructor(readonly inputData: { id: string }) {
    if (!inputData.id) {
      throw new Error("Id is not vaild.");
    }
  }

  get(): { id: string } {
    return this.inputData;
  }
}
