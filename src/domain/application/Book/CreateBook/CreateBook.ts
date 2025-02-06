import InputBoundary from "@/domain/application/InputBoundary";
import OutputBoundary from "@/domain/application/OutputBoundary";
import UseCase from "@/domain/application/UseCase";
import Book from "@/domain/core/Book";
import Repository from "@/domain/core/Repository";
import BookOutputBoundary from "../BookOutputBoundary";
import { DBOutputBookData } from "@/domain/application/@types/BookTypes";
import InternalServerError from "../../Errors/InternalServerError";
import BookAlreadyExistsError from "../../Errors/BookUseCaseError/BookAlreadyExistsError";

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
      throw new BookAlreadyExistsError();
    }

    const createdBook: DBOutputBookData | null =
      await this.repository.save(book);
    if (!createdBook) {
      throw new InternalServerError();
    }

    return [new BookOutputBoundary(createdBook)];
  }
}
