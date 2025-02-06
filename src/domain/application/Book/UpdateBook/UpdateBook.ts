import InputBoundary from "@/domain/application/InputBoundary";
import OutputBoundary from "@/domain/application/OutputBoundary";
import UseCase from "@/domain/application/UseCase";
import Book from "@/domain/core/Book";
import Repository from "@/domain/core/Repository";
import BookOutputBoundary from "../BookOutputBoundary";
import {
  DBOutputBookData,
  InputBookUpdate,
} from "@/domain/application/@types/BookTypes";
import NotFoundError from "../../Errors/NotFoundError";
import InternalServerError from "../../Errors/InternalServerError";

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
      throw new NotFoundError("Book");
    }

    const bookUpdated: DBOutputBookData | null =
      await this.repository.update(updateData);
    if (!bookUpdated) {
      throw new InternalServerError();
    }

    return [new BookOutputBoundary(bookUpdated)];
  }
}
