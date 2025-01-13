import CreateBookInputBoundary from "@/application/Book/CreateBook/CreateBookInputBoundary";
import Book from "@/core/Book";
import BookGenre from "@/core/BookGenre";
import ReadingStatus from "@/core/ReadingStatus";

describe("CreateBookInputBoundary", () => {
  describe("Constructor", () => {
    it("Should return an instance of CreateBookInputBoundary", () => {
      const inputData = {
        user_id: "id-00001",
        title: "O Senhor dos Anéis",
        author: ["J. R. R. Tolkien"],
        edition: "Coleção Nova Fronteira",
        publication_year: 1954,
        publisher: "Nova Fronteira",
        publication_location: "Rio de Janeiro",
        isbn: "9788520908190",
        volume: 1,
        genre: ["Fantasia", "Clássicos"],
        status: "Leitura completa",
      };

      expect(new CreateBookInputBoundary(inputData)).toBeInstanceOf(
        CreateBookInputBoundary,
      );
    });

    it("Should throws an error of Book genre is not valid.", () => {
      const inputData = {
        user_id: "id-00001",
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
      };

      expect(() => new CreateBookInputBoundary(inputData)).toThrow(
        "Book genre is not valid.",
      );
    });
    it("Should throws an error of Reading status is not valid.", () => {
      const inputData = {
        user_id: "id-00001",
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
      };

      expect(() => new CreateBookInputBoundary(inputData)).toThrow(
        "Reading status is not valid.",
      );
    });
  });

  describe("get", () => {
    it("Should return an object containing an user_id and a Book class instance", () => {
      const inputData = {
        user_id: "id-00001",
        title: "O Senhor dos Anéis",
        author: ["J. R. R. Tolkien"],
        edition: "Coleção Nova Fronteira",
        publication_year: 1954,
        publisher: "Nova Fronteira",
        publication_location: "Rio de Janeiro",
        isbn: "9788520908190",
        volume: 1,
        genre: ["Fantasia", "Clássicos"],
        status: "Leitura completa",
      };
      const input = new CreateBookInputBoundary(inputData);

      expect(input.get()).toEqual({
        user_id: inputData.user_id,
        book: expect.any(Book),
      });
      expect(input.get().book.get()).toEqual({
        title: inputData.title,
        author: inputData.author,
        edition: inputData.edition,
        publication_year: inputData.publication_year,
        publisher: inputData.publisher,
        publication_location: inputData.publication_location,
        isbn: inputData.isbn,
        volume: inputData.volume,
        genre: [BookGenre.FANTASY, BookGenre.CLASSICS],
        status: ReadingStatus.COMPLETED,
      });
    });
  });
});
