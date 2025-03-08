import { BookParamsType } from "@/domain/core/@types/types";
import Book from "@/domain/core/Book";
import BookGenre from "@/domain/core/BookGenre";

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
        inserted_by: "user_id-00001",
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
        inserted_by: "user_id-00001",
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
        inserted_by: "user_id-00001",
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
        inserted_by: "user_id-00001",
      };

      const book = new Book(params);

      expect(book.get()).toEqual(params);
    });
  });
});
