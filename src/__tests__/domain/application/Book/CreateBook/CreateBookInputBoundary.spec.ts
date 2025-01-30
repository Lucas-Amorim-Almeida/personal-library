import CreateBookInputBoundary from "@/domain/application/Book/CreateBook/CreateBookInputBoundary";
import Book from "@/domain/core/Book";
import BookGenre from "@/domain/core/BookGenre";

describe("CreateBookInputBoundary", () => {
  describe("Constructor", () => {
    it("Should return an instance of CreateBookInputBoundary", () => {
      const inputData = {
        title: "O Senhor dos Anéis",
        author: ["J. R. R. Tolkien"],
        edition: "Coleção Nova Fronteira",
        publication_year: 1954,
        publisher: "Nova Fronteira",
        publication_location: "Rio de Janeiro",
        isbn: "9788520908190",
        volume: 1,
        genre: ["Fantasia", "Clássicos"],
      };

      expect(new CreateBookInputBoundary(inputData)).toBeInstanceOf(
        CreateBookInputBoundary,
      );
    });

    it("Should throws an error of Book genre is not valid.", () => {
      const inputData = {
        title: "O Senhor dos Anéis",
        author: ["J. R. R. Tolkien"],
        edition: "Coleção Nova Fronteira",
        publication_year: 1954,
        publisher: "Nova Fronteira",
        publication_location: "Rio de Janeiro",
        isbn: "9788520908190",
        volume: 1,
        genre: ["invaildo"],
      };

      expect(() => new CreateBookInputBoundary(inputData)).toThrow(
        "Book genre is not valid.",
      );
    });
  });

  describe("get", () => {
    it("Should return an object containing an user_id and a Book class instance", () => {
      const inputData = {
        title: "O Senhor dos Anéis",
        author: ["J. R. R. Tolkien"],
        edition: "Coleção Nova Fronteira",
        publication_year: 1954,
        publisher: "Nova Fronteira",
        publication_location: "Rio de Janeiro",
        isbn: "9788520908190",
        volume: 1,
        genre: ["Fantasia", "Clássicos"],
      };
      const input = new CreateBookInputBoundary(inputData);

      expect(input.get()).toBeInstanceOf(Book);
      expect(input.get().get()).toEqual({
        title: inputData.title,
        author: inputData.author,
        edition: inputData.edition,
        publication_year: inputData.publication_year,
        publisher: inputData.publisher,
        publication_location: inputData.publication_location,
        isbn: inputData.isbn,
        volume: inputData.volume,
        genre: [BookGenre.FANTASY, BookGenre.CLASSICS],
      });
    });
  });
});
