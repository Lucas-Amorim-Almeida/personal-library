import InputBoundary from "@/domain/application/InputBoundary";
import Repository from "@/domain/core/Repository";
import OutputBoundary from "@/domain/application/OutputBoundary";
import BookOutputBoundary from "../BookOutputBoundary";
import UseCase from "@/domain/application/UseCase";
import { DBOutputBookData } from "@/domain/application/@types/BookTypes";

export default class SearchBook
  implements UseCase<{ query: string; take: number }, DBOutputBookData>
{
  constructor(readonly repository: Repository) {}

  async execute(
    inputData: InputBoundary<{ query: string; take: number }>,
  ): Promise<OutputBoundary<DBOutputBookData>[]> {
    const { query, take } = inputData.get();

    const dbBook: DBOutputBookData[] = await this.repository.getMany(
      { query },
      take,
    );

    const searchedBooks = dbBook.map((book) => new BookOutputBoundary(book));

    return searchedBooks;
  }
}
