import { DBOutputCollectionData } from "@/domain/application/@types/CollectionTypes";
import OutputBoundary from "@/domain/application/OutputBoundary";

export default class CollectionOutputBoundary
  implements OutputBoundary<DBOutputCollectionData>
{
  constructor(readonly data: DBOutputCollectionData) {}

  get(): DBOutputCollectionData {
    return this.data;
  }
}
