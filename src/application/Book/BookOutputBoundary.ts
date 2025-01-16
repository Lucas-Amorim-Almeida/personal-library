import { DBOutputBookData } from "@/application/@types/applicationTypes";
import InputBoundary from "@/application/InputBoundary";
import Utils from "@/application/Utils";
import Book from "@/core/Book";
import BookGenre from "@/core/BookGenre";
import ReadingStatus from "@/core/ReadingStatus";

export default class BookOutputBoundary implements InputBoundary<Book> {
  private book: Book;
  constructor(data: DBOutputBookData) {
    this.book = new Book({
      title: data.title,
      author: data.author,
      edition: data.edition,
      publication_year: data.publication_year,
      publisher: data.publisher,
      publication_location: data.publication_location,
      isbn: data.isbn,
      volume: data.volume,
      genre: data.genre.map((item) =>
        Utils.define(BookGenre, item, "Book genre"),
      ),
      status: Utils.define(ReadingStatus, data.status, "Reading status"),
      created_at: data.created_at,
      updated_at: data.updated_at,
    });
    this.book.setId(data.id);
  }

  get(): Book {
    return this.book;
  }
}
