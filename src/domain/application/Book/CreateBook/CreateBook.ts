import InputBoundary from "@/domain/application/InputBoundary";
import OutputBoundary from "@/domain/application/OutputBoundary";
import UseCase from "@/domain/application/UseCase";
import Book from "@/domain/core/Book";
import Repository from "@/domain/core/Repository";
import BookOutputBoundary from "../BookOutputBoundary";
import { DBOutputBookData } from "@/domain/application/@types/BookTypes";

export default class CreateBook implements UseCase<Book, Book> {
  constructor(readonly repository: Repository) {}

  async execute(
    inputData: InputBoundary<Book>,
  ): Promise<OutputBoundary<Book>[]> {
    const book = inputData.get();

    const dbBook: DBOutputBookData | null = await this.repository.getOne({
      book,
    });
    if (dbBook) {
      throw new Error("The Book already exists in the database.");
    }

    const createdBook: DBOutputBookData | null =
      await this.repository.save(book);
    if (!createdBook) {
      throw new Error("An internal server error occurred.");
    }

    return [new BookOutputBoundary(createdBook)];
  }
}
