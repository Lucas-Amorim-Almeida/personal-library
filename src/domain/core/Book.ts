import { BookParamsType } from "./@types/types";
import BookGenre from "./BookGenre";

export default class Book {
  private id?: string;
  private title: string;
  private author: string[];
  private edition: string;
  private publication_year: number;
  private publisher: string;
  private publication_location: string;
  private isbn?: string;
  private volume?: number;
  private genre: BookGenre[];
  private created_at?: Date;
  private updated_at?: Date;
  private inserted_by: string;

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
    this.created_at = bookData.created_at;
    this.updated_at = bookData.updated_at;
    this.inserted_by = bookData.inserted_by;
  }

  get(): {
    id?: string;
    title: string;
    author: string[];
    edition: string;
    publication_year: number;
    publisher: string;
    publication_location: string;
    isbn?: string;
    volume?: number;
    genre: BookGenre[];
    created_at?: Date;
    updated_at?: Date;
    inserted_by: string;
  } {
    return {
      id: this.id,
      title: this.title,
      author: this.author,
      edition: this.edition,
      publication_year: this.publication_year,
      publisher: this.publisher,
      publication_location: this.publication_location,
      isbn: this.isbn,
      volume: this.volume,
      genre: this.genre,
      created_at: this.created_at,
      updated_at: this.updated_at,
      inserted_by: this.inserted_by,
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

  getTitle(): string {
    return this.title;
  }

  getEdition(): string {
    return this.edition;
  }

  getYear(): number {
    return this.publication_year;
  }

  getLocation(): string {
    return this.publication_location;
  }

  getISBN(): string | undefined {
    return this.isbn;
  }

  getVolume(): number | undefined {
    return this.volume;
  }

  getId(): string | undefined {
    return this.id;
  }

  setId(id: string): void {
    this.id = id;
  }

  getInsertedBy(): string {
    return this.inserted_by;
  }
}
