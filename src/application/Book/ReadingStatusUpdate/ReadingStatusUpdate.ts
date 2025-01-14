import { DBOutputBookData } from "@/application/@types/applicationTypes";
import InputBoundary from "@/application/InputBoundary";
import OutputBoundary from "@/application/OutputBoundary";
import UseCase from "@/application/UseCase";
import Book from "@/core/Book";
import ReadingStatus from "@/core/ReadingStatus";
import Repository from "@/core/Repository";
import ReadingStatusUpdateOutputBoundary from "./ReadingStatusUpdateOutputBoundary";

export default class ReadingStatusUpdate
  implements UseCase<{ id: string; status: ReadingStatus }, Book>
{
  constructor(readonly repository: Repository) {}

  async execute(
    inputData: InputBoundary<{ id: string; status: ReadingStatus }>,
  ): Promise<OutputBoundary<Book>> {
    const { id, status } = inputData.get();

    const dbBook: DBOutputBookData | null = await this.repository.getOne({
      id,
    });
    if (!dbBook) {
      throw new Error("Book not found.");
    }

    const updatedBook: DBOutputBookData | null = await this.repository.update({
      id,
      status,
    });
    if (!updatedBook) {
      throw new Error("An internal server error occurred.");
    }

    return new ReadingStatusUpdateOutputBoundary(updatedBook);
  }
}
