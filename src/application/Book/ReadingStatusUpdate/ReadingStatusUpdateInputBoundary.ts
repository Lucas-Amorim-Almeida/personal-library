import InputBoundary from "@/application/InputBoundary";
import Utils from "@/application/Utils";
import ReadingStatus from "@/core/ReadingStatus";

export default class ReadingStatusUpdateInputBoundary
  implements InputBoundary<{ id: string; status: ReadingStatus }>
{
  private id: string;
  private status: ReadingStatus;

  constructor(inputData: { id: string; status: string }) {
    this.id = inputData.id;
    this.status = Utils.define(
      ReadingStatus,
      inputData.status,
      "Reading status",
    );
  }

  get(): { id: string; status: ReadingStatus } {
    return {
      id: this.id,
      status: this.status,
    };
  }
}
