import { DBOutputBookData } from "@/application/@types/applicationTypes";
import InputBoundary from "@/application/InputBoundary";
import OutputBoundary from "@/application/OutputBoundary";
import UseCase from "@/application/UseCase";
import Book from "@/core/Book";
import Repository from "@/core/Repository";
import CreateBookOutputBoundary from "./CreateBookOutputBoundary";

export default class CreateBook implements UseCase<Book, Book> {
  constructor(readonly repository: Repository) {}

  async execute(inputData: InputBoundary<Book>): Promise<OutputBoundary<Book>> {
    const book = inputData.get();

    const dbBook: DBOutputBookData | null = await this.repository.getOne({
      book,
    });
    if (dbBook) {
      throw new Error("The Book already exists in the database.");
    }

    const createdBook: DBOutputBookData | null = await this.repository.save({
      book,
    });
    if (!createdBook) {
      throw new Error("An internal server error occurred.");
    }

    return new CreateBookOutputBoundary(createdBook);
  }
}
