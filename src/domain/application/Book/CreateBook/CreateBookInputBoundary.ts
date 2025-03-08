import { InputBook } from "@/domain/application/@types/BookTypes";
import InputBoundary from "@/domain/application/InputBoundary";
import Utils from "@/domain/application/Utils";
import Book from "@/domain/core/Book";
import BookGenre from "@/domain/core/BookGenre";

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
      inserted_by: inputData.inserted_by,
    });
  }

  get(): Book {
    return this.book;
  }
}
