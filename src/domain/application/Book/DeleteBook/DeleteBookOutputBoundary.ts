import { DBOutputBookData } from "@/domain/application/@types/BookTypes";
import OutputBoundary from "@/domain/application/OutputBoundary";

export default class DeleteBookOutputBoundary
  implements OutputBoundary<boolean>
{
  constructor(readonly data: DBOutputBookData | null) {}

  get(): boolean {
    return this.data === null;
  }
}
