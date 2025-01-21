import InputBoundary from "@/application/InputBoundary";
import Repository from "@/core/Repository";
import OutputBoundary from "@/application/OutputBoundary";
import Book from "@/core/Book";
import BookOutputBoundary from "../BookOutputBoundary";
import { DBOutputBookData } from "@/application/@types/applicationTypes";
import UseCase from "@/application/UseCase";

export default class SearchBook
  implements UseCase<{ query: string; take: number }, Book>
{
  constructor(readonly repository: Repository) {}

  async execute(
    inputData: InputBoundary<{ query: string; take: number }>,
  ): Promise<OutputBoundary<Book>[]> {
    const { query, take } = inputData.get();

    const dbBook: DBOutputBookData[] = await this.repository.getMany(
      { query },
      take,
    );

    const searchedBooks = dbBook.map((book) => new BookOutputBoundary(book));

    return searchedBooks;
  }
}
