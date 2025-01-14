import { dbBookExample } from "@/__tests__/__mocks__/mocks";
import ReadingStatusUpdateOutputBoundary from "@/application/Book/ReadingStatusUpdate/ReadingStatusUpdateOutputBoundary";
import Book from "@/core/Book";

describe("ReadingStatusUpdateOutputBoundary", () => {
  describe("Constructor", () => {
    it("Should be an instance of ReadingStatusUpdateOutputBoundary", () => {
      expect(
        new ReadingStatusUpdateOutputBoundary(dbBookExample),
      ).toBeInstanceOf(ReadingStatusUpdateOutputBoundary);
    });

    it("Should throws an error of Reading status is not valid.", () => {
      const outputParams = {
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

      expect(() => new ReadingStatusUpdateOutputBoundary(outputParams)).toThrow(
        "Reading status is not valid.",
      );
    });

    it("Should throws an error of Book genre is not valid.", () => {
      const outputParams = {
        id: "id-00001",
        title: "O Senhor dos Anéis",
        author: ["J. R. R. Tolkien"],
        edition: "Coleção Nova Fronteira",
        publication_year: 1954,
        publisher: "Nova Fronteira",
        publication_location: "Rio de Janeiro",
        isbn: "9788520908190",
        volume: 1,
        genre: ["Fantasia", "inválido"],
        status: "Leitura completa",
        created_at: new Date(2020, 2, 20),
        updated_at: new Date(2022, 2, 22),
      };

      expect(() => new ReadingStatusUpdateOutputBoundary(outputParams)).toThrow(
        "Book genre is not valid.",
      );
    });
  });

  describe("get", () => {
    it("Should return an object with book id and reading status", () => {
      const output = new ReadingStatusUpdateOutputBoundary(dbBookExample);

      expect(output.get()).toBeInstanceOf(Book);
    });
  });
});
