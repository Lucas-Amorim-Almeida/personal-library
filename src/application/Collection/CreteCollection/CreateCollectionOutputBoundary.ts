import { DBOutputCollectionData } from "@/application/@types/applicationTypes";
import OutputBoundary from "@/application/OutputBoundary";

export default class CreateCollectionOutputBoundary
  implements OutputBoundary<DBOutputCollectionData>
{
  constructor(readonly data: DBOutputCollectionData) {}

  get(): DBOutputCollectionData {
    return this.data;
  }
}
