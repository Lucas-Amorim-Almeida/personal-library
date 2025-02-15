import InputBoundary from "@/domain/application/InputBoundary";
import OutputBoundary from "@/domain/application/OutputBoundary";
import UseCase from "@/domain/application/UseCase";
import Book from "@/domain/core/Book";
import Repository from "@/domain/core/Repository";
import BookOutputBoundary from "../BookOutputBoundary";
import { DBOutputBookData } from "@/domain/application/@types/BookTypes";
import InternalError from "../../Errors/InternalError";
import BookAlreadyExistsError from "../../Errors/BookUseCaseError/BookAlreadyExistsError";

export default class CreateBook implements UseCase<Book, DBOutputBookData> {
  constructor(readonly repository: Repository) {}

  private authorVerifyEquality(
    dbBookAuthor: string[],
    bookAuthor: string[],
  ): boolean {
    const normalize = (arr: string[]) => arr.map((a) => a.trim().toLowerCase());
    const normalizedDbAuthors = normalize(dbBookAuthor);
    const normalizedBookAuthors = normalize(bookAuthor);

    return normalizedDbAuthors.every((author) =>
      normalizedBookAuthors.includes(author),
    );
  }

  async execute(
    inputData: InputBoundary<Book>,
  ): Promise<OutputBoundary<DBOutputBookData>[]> {
    const book = inputData.get();

    const dbBook: DBOutputBookData | null = await this.repository.getOne({
      title: book.getTitle(),
    });

    const isSameBook =
      !!dbBook &&
      this.authorVerifyEquality(dbBook.author, book.getAuthor()) &&
      dbBook.edition === book.getEdition() &&
      dbBook.publication_year === book.getYear() &&
      dbBook.publisher === book.getPublisher() &&
      dbBook.publication_location === book.getLocation();

    if (isSameBook) {
      throw new BookAlreadyExistsError();
    }

    const createdBook: DBOutputBookData | null =
      await this.repository.save(book);
    if (!createdBook) {
      throw new InternalError();
    }

    return [new BookOutputBoundary(createdBook)];
  }
}
