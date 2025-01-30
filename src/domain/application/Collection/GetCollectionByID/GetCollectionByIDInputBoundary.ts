import InputBoundary from "@/domain/application/InputBoundary";

export default class GetCollectionByIDInputBoundary
  implements InputBoundary<{ collection_id: string }>
{
  constructor(private readonly inputData: { collection_id: string }) {
    if (!inputData.collection_id) {
      throw new Error("Collection id is not valid.");
    }
  }

  get(): { collection_id: string } {
    return this.inputData;
  }
}
