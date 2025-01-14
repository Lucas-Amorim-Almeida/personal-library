import { dbBookExample } from "@/__tests__/__mocks__/mocks";
import CreateBookOutputBoundary from "@/application/Book/CreateBook/CreateBookOutputBoundary";
import Book from "@/core/Book";
import BookGenre from "@/core/BookGenre";
import ReadingStatus from "@/core/ReadingStatus";

describe("CreateBookOutputBoundary", () => {
  describe("Constructor", () => {
    it("Should be an instance of CreateBookOutputBoundary", () => {
      expect(new CreateBookOutputBoundary(dbBookExample)).toBeInstanceOf(
        CreateBookOutputBoundary,
      );
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
        status: "Leitura completa",
        created_at: new Date(2020, 2, 20),
        updated_at: new Date(2022, 2, 22),
      };

      expect(() => new CreateBookOutputBoundary(inputData)).toThrow(
        "Book genre is not valid.",
      );
    });
    it("Should throws an error of Reading status is not valid.", () => {
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
        genre: ["Fantasia", "Clássicos"],
        status: "invalido",
        created_at: new Date(2020, 2, 20),
        updated_at: new Date(2022, 2, 22),
      };

      expect(() => new CreateBookOutputBoundary(inputData)).toThrow(
        "Reading status is not valid.",
      );
    });
  });

  describe("get", () => {
    it("Should return an object containing an user_id and a Book class instance", () => {
      const input = new CreateBookOutputBoundary(dbBookExample);

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
        status: ReadingStatus.IN_PROGRESS,
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      });
    });
  });
});
