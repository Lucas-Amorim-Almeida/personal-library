import { BookParamsType } from "./@types/types";
import BookGenre from "./BookGenre";
import ReadingStatus from "./ReadingStatus";

export default class Book {
  private title: string;
  private author: string[];
  private edition: string;
  private publication_year: number;
  private publisher: string;
  private publication_location: string;
  private isbn?: string;
  private volume?: number;
  private genre: BookGenre[];
  private status: ReadingStatus;

  constructor(bookData: BookParamsType) {
    this.title = bookData.title;
    this.author = bookData.author;
    this.edition = bookData.edition;
    this.publication_year = bookData.publication_year;
    this.publisher = bookData.publisher;
    this.publication_location = bookData.publication_location;
    this.isbn = bookData.isbn;
    this.volume = bookData.volume;
    this.genre = bookData.genre;
    this.status = bookData.status;
  }

  get(): {
    title: string;
    author: string[];
    edition: string;
    publication_year: number;
    publisher: string;
    publication_location: string;
    isbn?: string;
    volume?: number;
    genre: BookGenre[];
    status: ReadingStatus;
  } {
    return {
      title: this.title,
      author: this.author,
      edition: this.edition,
      publication_year: this.publication_year,
      publisher: this.publisher,
      publication_location: this.publication_location,
      isbn: this.isbn,
      volume: this.volume,
      genre: this.genre,
      status: this.status,
    };
  }

  getAuthor(): string[] {
    return this.author;
  }

  getPublisher(): string {
    return this.publisher;
  }

  getGenre(): BookGenre[] {
    return this.genre;
  }

  getStatus(): ReadingStatus {
    return this.status;
  }

  setStatus(status: ReadingStatus): void {
    this.status = status;
  }
}
