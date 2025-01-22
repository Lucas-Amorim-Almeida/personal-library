import { DBOutputCollectionData } from "@/application/@types/applicationTypes";
import OutputBoundary from "@/application/OutputBoundary";

export default class DeleteCollectionOutputBoundary
  implements OutputBoundary<boolean>
{
  constructor(readonly data: DBOutputCollectionData | null) {}

  get(): boolean {
    return this.data === null;
  }
}
