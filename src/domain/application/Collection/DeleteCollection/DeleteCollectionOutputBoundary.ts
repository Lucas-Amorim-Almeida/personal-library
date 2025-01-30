import { DBOutputCollectionData } from "@/domain/application/@types/CollectionTypes";
import OutputBoundary from "@/domain/application/OutputBoundary";

export default class DeleteCollectionOutputBoundary
  implements OutputBoundary<boolean>
{
  constructor(readonly data: DBOutputCollectionData | null) {}

  get(): boolean {
    return this.data === null;
  }
}
