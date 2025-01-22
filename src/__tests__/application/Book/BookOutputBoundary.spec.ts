import { dbBookExample } from "@/__tests__/__mocks__/mocks";
import { DBOutputBookData } from "@/application/@types/applicationTypes";
import BookOutputBoundary from "@/application/Book/BookOutputBoundary";
import Book from "@/core/Book";
import BookGenre from "@/core/BookGenre";

describe("CreateBookOutputBoundary", () => {
  describe("Constructor", () => {
    it("Should be an instance of CreateBookOutputBoundary", () => {
      expect(
        new BookOutputBoundary(dbBookExample as DBOutputBookData),
      ).toBeInstanceOf(BookOutputBoundary);
    });

    it("Should throws an error of Book genre is not valid.", () => {
      const inputData = {
        id: "id-00001",
        title: "O Senhor dos Anéis",
        author: ["J. R. R. Tolkien"],
        edition: "Coleção Nova Fronteira",
        publication_year: 1954,
        publisher: "Nova Fronteira",
        publication_location: "Rio de Janeiro",
        isbn: "9788520908190",
        volume: 1,
        genre: ["invaildo"],
        created_at: new Date(2020, 2, 20),
        updated_at: new Date(2022, 2, 22),
      };

      expect(
        () => new BookOutputBoundary(inputData as DBOutputBookData),
      ).toThrow("Book genre is not valid.");
    });
  });

  describe("get", () => {
    it("Should return an object containing an user_id and a Book class instance", () => {
      const input = new BookOutputBoundary(dbBookExample as DBOutputBookData);

      expect(input.get()).toBeInstanceOf(Book);
      expect(input.get().get()).toEqual({
        id: "id-00001",
        title: dbBookExample.title,
        author: dbBookExample.author,
        edition: dbBookExample.edition,
        publication_year: dbBookExample.publication_year,
        publisher: dbBookExample.publisher,
        publication_location: dbBookExample.publication_location,
        isbn: dbBookExample.isbn,
        volume: dbBookExample.volume,
        genre: [BookGenre.FANTASY, BookGenre.CLASSICS],
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      });
    });
  });
});
