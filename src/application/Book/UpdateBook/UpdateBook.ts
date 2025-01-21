import {
  DBOutputBookData,
  InputBookUpdate,
} from "@/application/@types/applicationTypes";
import InputBoundary from "@/application/InputBoundary";
import OutputBoundary from "@/application/OutputBoundary";
import UseCase from "@/application/UseCase";
import Book from "@/core/Book";
import Repository from "@/core/Repository";
import BookOutputBoundary from "../BookOutputBoundary";

export default class UpdateBook implements UseCase<InputBookUpdate, Book> {
  constructor(readonly repository: Repository) {}

  async execute(
    inputData: InputBoundary<InputBookUpdate>,
  ): Promise<OutputBoundary<Book>[]> {
    const { id, ...updateData } = inputData.get();

    const dbBook: DBOutputBookData | null = await this.repository.getOne({
      id,
    });
    if (!dbBook) {
      throw new Error("Book not found.");
    }

    const bookUpdated: DBOutputBookData | null =
      await this.repository.update(updateData);
    if (!bookUpdated) {
      throw new Error("An internal server error occurred.");
    }

    return [new BookOutputBoundary(bookUpdated)];
  }
}
