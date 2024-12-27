import { BookParamsType } from "@/entities/@types/types";
import Book from "@/entities/Book";
import BookGenre from "@/entities/BookGenre";
import ReadingStatus from "@/entities/ReadingStatus";

describe("Book", () => {
  describe("Constructor", () => {
    it("Should be a instance of Book", () => {
      const params: BookParamsType = {
        title: "1984",
        author: ["George Orwell"],
        edition: "2ª Edição",
        publication_year: 1949,
        publisher: "Secker & Warburg",
        publication_location: "Londres",
        genre: [BookGenre.DYSTOPIAN, BookGenre.POLITICS],
        status: ReadingStatus.IN_PROGRESS,
      };

      expect(new Book(params)).toBeInstanceOf(Book);
    });
    it("Should be a instance of Book with volume and isbn", () => {
      const params: BookParamsType = {
        title: "O Senhor dos Anéis: A Sociedade do Anel",
        author: ["J.R.R. Tolkien"],
        edition: "1ª Edição",
        publication_year: 1954,
        publisher: "Allen & Unwin",
        publication_location: "Londres",
        isbn: "978-3-16-148410-0",
        volume: 1,
        genre: [BookGenre.FANTASY, BookGenre.ACTION_ADVENTURE],
        status: ReadingStatus.COMPLETED,
      };

      expect(new Book(params)).toBeInstanceOf(Book);
    });
  });

  describe("get", () => {
    it("Should returns an object", () => {
      const params: BookParamsType = {
        title: "1984",
        author: ["George Orwell"],
        edition: "2ª Edição",
        publication_year: 1949,
        publisher: "Secker & Warburg",
        publication_location: "Londres",
        genre: [BookGenre.DYSTOPIAN, BookGenre.POLITICS],
        status: ReadingStatus.IN_PROGRESS,
      };

      const book = new Book(params);

      expect(book.get()).toEqual(params);
    });
    it("Should returns an object with volume and isbn", () => {
      const params: BookParamsType = {
        title: "O Senhor dos Anéis: A Sociedade do Anel",
        author: ["J.R.R. Tolkien"],
        edition: "1ª Edição",
        publication_year: 1954,
        publisher: "Allen & Unwin",
        publication_location: "Londres",
        isbn: "978-3-16-148410-0",
        volume: 1,
        genre: [BookGenre.FANTASY, BookGenre.ACTION_ADVENTURE],
        status: ReadingStatus.COMPLETED,
      };

      const book = new Book(params);

      expect(book.get()).toEqual(params);
    });
  });

  describe("getAuthor", () => {
    const params: BookParamsType = {
      title: "O Senhor dos Anéis: A Sociedade do Anel",
      author: ["J.R.R. Tolkien"],
      edition: "1ª Edição",
      publication_year: 1954,
      publisher: "Allen & Unwin",
      publication_location: "Londres",
      isbn: "978-3-16-148410-0",
      volume: 1,
      genre: [BookGenre.FANTASY, BookGenre.ACTION_ADVENTURE],
      status: ReadingStatus.COMPLETED,
    };

    it("Should be returns the author name", () => {
      const book = new Book(params);
      expect(book.getAuthor()).toEqual(expect.arrayContaining(params.author));
    });
  });

  describe("getPublisher", () => {
    const params: BookParamsType = {
      title: "O Senhor dos Anéis: A Sociedade do Anel",
      author: ["J.R.R. Tolkien"],
      edition: "1ª Edição",
      publication_year: 1954,
      publisher: "Allen & Unwin",
      publication_location: "Londres",
      isbn: "978-3-16-148410-0",
      volume: 1,
      genre: [BookGenre.FANTASY, BookGenre.ACTION_ADVENTURE],
      status: ReadingStatus.COMPLETED,
    };

    it("Should be returns the publisher name", () => {
      const book = new Book(params);
      expect(book.getPublisher()).toEqual(params.publisher);
    });
  });

  describe("getGenre", () => {
    const params: BookParamsType = {
      title: "O Senhor dos Anéis: A Sociedade do Anel",
      author: ["J.R.R. Tolkien"],
      edition: "1ª Edição",
      publication_year: 1954,
      publisher: "Allen & Unwin",
      publication_location: "Londres",
      isbn: "978-3-16-148410-0",
      volume: 1,
      genre: [BookGenre.FANTASY, BookGenre.ACTION_ADVENTURE],
      status: ReadingStatus.COMPLETED,
    };

    it("Should be returns the publisher name", () => {
      const book = new Book(params);
      expect(book.getGenre()).toEqual(expect.arrayContaining(params.genre));
    });
  });

  describe("getStatus", () => {
    const params: BookParamsType = {
      title: "O Senhor dos Anéis: A Sociedade do Anel",
      author: ["J.R.R. Tolkien"],
      edition: "1ª Edição",
      publication_year: 1954,
      publisher: "Allen & Unwin",
      publication_location: "Londres",
      isbn: "978-3-16-148410-0",
      volume: 1,
      genre: [BookGenre.FANTASY, BookGenre.ACTION_ADVENTURE],
      status: ReadingStatus.COMPLETED,
    };

    it("Should be returns the publisher name", () => {
      const book = new Book(params);
      expect(Object.values(ReadingStatus)).toContain(book.getStatus());
    });
  });

  describe("getStatus", () => {
    const params: BookParamsType = {
      title: "O Senhor dos Anéis: A Sociedade do Anel",
      author: ["J.R.R. Tolkien"],
      edition: "1ª Edição",
      publication_year: 1954,
      publisher: "Allen & Unwin",
      publication_location: "Londres",
      isbn: "978-3-16-148410-0",
      volume: 1,
      genre: [BookGenre.FANTASY, BookGenre.ACTION_ADVENTURE],
      status: ReadingStatus.PENDING,
    };

    it("Should be returns the publisher name", () => {
      const book = new Book(params);
      const newStatus = ReadingStatus.IN_PROGRESS;
      book.setStatus(newStatus);
      expect(book.getStatus()).toEqual(newStatus);
    });
  });
});
