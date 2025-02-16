import InputBoundary from "@/domain/application/InputBoundary";
import Repository from "@/domain/core/Repository";
import OutputBoundary from "@/domain/application/OutputBoundary";
import BookOutputBoundary from "../BookOutputBoundary";
import UseCase from "@/domain/application/UseCase";
import { DBOutputBookData } from "@/domain/application/@types/BookTypes";

export default class GetBooks
  implements UseCase<{ take?: number }, DBOutputBookData>
{
  constructor(readonly repository: Repository) {}

  async execute(
    inputData: InputBoundary<{ take?: number }>,
  ): Promise<OutputBoundary<DBOutputBookData>[]> {
    const { take } = inputData.get();

    const dbBook: DBOutputBookData[] = take
      ? await this.repository.getMany({}, take)
      : await this.repository.getAll();

    const searchedBooks = dbBook.map((book) => new BookOutputBoundary(book));

    return searchedBooks;
  }
}
