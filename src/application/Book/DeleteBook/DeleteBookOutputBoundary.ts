import { DBOutputBookData } from "@/application/@types/applicationTypes";
import OutputBoundary from "@/application/OutputBoundary";

export default class DeleteBookOutputBoundary
  implements OutputBoundary<boolean>
{
  constructor(readonly data: DBOutputBookData | null) {}

  get(): boolean {
    return this.data === null;
  }
}
