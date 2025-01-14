import { InputBook } from "@/application/@types/applicationTypes";
import InputBoundary from "@/application/InputBoundary";
import Utils from "@/application/Utils";
import Book from "@/core/Book";
import BookGenre from "@/core/BookGenre";
import ReadingStatus from "@/core/ReadingStatus";

export default class CreateBookInputBoundary implements InputBoundary<Book> {
  private book: Book;
  constructor(inputData: InputBook) {
    this.book = new Book({
      title: inputData.title,
      author: inputData.author,
      edition: inputData.edition,
      publication_year: inputData.publication_year,
      publisher: inputData.publisher,
      publication_location: inputData.publication_location,
      isbn: inputData.isbn,
      volume: inputData.volume,
      genre: inputData.genre.map((item) =>
        Utils.define(BookGenre, item, "Book genre"),
      ),
      status: Utils.define(ReadingStatus, inputData.status, "Reading status"),
    });
  }

  get(): Book {
    return this.book;
  }
}
