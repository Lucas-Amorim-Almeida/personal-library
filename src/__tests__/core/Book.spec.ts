import { BookParamsType } from "@/core/@types/types";
import Book from "@/core/Book";
import BookGenre from "@/core/BookGenre";

describe("Book", () => {
  describe("Constructor", () => {
    it("Should be an instance of Book", () => {
      const params: BookParamsType = {
        title: "1984",
        author: ["George Orwell"],
        edition: "2ª Edição",
        publication_year: 1949,
        publisher: "Secker & Warburg",
        publication_location: "Londres",
        genre: [BookGenre.DYSTOPIAN, BookGenre.POLITICS],
      };

      expect(new Book(params)).toBeInstanceOf(Book);
    });
    it("Should be an instance of Book with volume and isbn", () => {
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
      };

      expect(new Book(params)).toBeInstanceOf(Book);
    });
  });

  describe("get", () => {
    it("Should return an object", () => {
      const params: BookParamsType = {
        title: "1984",
        author: ["George Orwell"],
        edition: "2ª Edição",
        publication_year: 1949,
        publisher: "Secker & Warburg",
        publication_location: "Londres",
        genre: [BookGenre.DYSTOPIAN, BookGenre.POLITICS],
      };

      const book = new Book(params);

      expect(book.get()).toEqual(params);
    });

    it("Should return an object with volume and isbn", () => {
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
    };

    it("Should return the author name", () => {
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
    };

    it("Should return the publisher name", () => {
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
    };

    it("Should return the publisher name", () => {
      const book = new Book(params);
      expect(book.getGenre()).toEqual(expect.arrayContaining(params.genre));
    });
  });

  describe("setId", () => {
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
    };

    it("Should return an object with id property.", () => {
      const book = new Book(params);
      const newId = "id-xxx1";
      book.setId(newId);
      expect(book.get()).toEqual({ id: newId, ...params });
    });
  });
});
