import InputBoundary from "@/domain/application/InputBoundary";
import Repository from "@/domain/core/Repository";
import OutputBoundary from "@/domain/application/OutputBoundary";
import BookOutputBoundary from "../BookOutputBoundary";
import UseCase from "@/domain/application/UseCase";
import { DBOutputBookData } from "@/domain/application/@types/BookTypes";

export default class SearchBook
  implements
    UseCase<
      {
        title?: string;
        author?: string;
        take?: number;
      },
      DBOutputBookData
    >
{
  constructor(readonly repository: Repository) {}

  async execute(
    inputData: InputBoundary<{
      title?: string;
      author?: string;
      take?: number;
    }>,
  ): Promise<OutputBoundary<DBOutputBookData>[]> {
    const { author, title, take } = inputData.get();

    let dbBook: DBOutputBookData[] = [];
    if (title && author) {
      const titleBooks: DBOutputBookData[] = await this.repository.getMany(
        { title },
        take,
      );
      const authorBooks: DBOutputBookData[] = await this.repository.getMany(
        { author },
        take,
      );
      dbBook = [...titleBooks, ...authorBooks];
    } else if (title) {
      dbBook = await this.repository.getMany({ title }, take);
    } else if (author) {
      dbBook = await this.repository.getMany({ author }, take);
    }

    const searchedBooks = dbBook.map((book) => new BookOutputBoundary(book));

    return searchedBooks;
  }
}
