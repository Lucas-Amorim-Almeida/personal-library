import InputBoundary from "@/application/InputBoundary";

export default class SearchBookInputBoundary
  implements InputBoundary<{ query: string; take: number }>
{
  constructor(readonly inputData: { query: string; take: number }) {
    if (inputData.query === "") {
      throw new Error("query is required.");
    }
    if (inputData.take <= 0) {
      throw new Error("take param is not valid.");
    }
  }

  get(): { query: string; take: number } {
    return this.inputData;
  }
}
