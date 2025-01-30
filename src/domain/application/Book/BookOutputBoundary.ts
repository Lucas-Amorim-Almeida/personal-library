import InputBoundary from "@/domain/application/InputBoundary";
import Utils from "@/domain/application/Utils";
import Book from "@/domain/core/Book";
import BookGenre from "@/domain/core/BookGenre";
import { DBOutputBookData } from "../@types/BookTypes";

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
      created_at: data.created_at,
      updated_at: data.updated_at,
    });
    this.book.setId(data.id);
  }

  get(): Book {
    return this.book;
  }
}
