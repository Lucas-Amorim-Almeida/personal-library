import { dbBookExample } from "@/__tests__/__mocks__/bookMock";
import { repositoryMock } from "@/__tests__/__mocks__/mocks";
import { InputBookUpdate } from "@/domain/application/@types/BookTypes";
import BookOutputBoundary from "@/domain/application/Book/BookOutputBoundary";
import UpdateBook from "@/domain/application/Book/UpdateBook/UpdateBook";
import InternalError from "@/domain/application/Errors/InternalError";
import EntityNotFoundError from "@/domain/application/Errors/EntityNotFoundError";
import InputBoundary from "@/domain/application/InputBoundary";
import Book from "@/domain/core/Book";
import BookGenre from "@/domain/core/BookGenre";

const inputParams = {
  id: "id-00001",
  title: "O Senhor dos Anéis",
  author: ["J. R. R. Tolkien"],
  edition: "Coleção Nova Fronteira",
  publication_year: 1954,
  publisher: "Nova Fronteira",
  publication_location: "Rio de Janeiro",
  isbn: "9788520908190",
  volume: 1,
  genre: [BookGenre.FANTASY, BookGenre.CLASSICS],
};

const inputBoundaryMock: jest.Mocked<InputBoundary<InputBookUpdate>> = {
  get: jest.fn(() => inputParams),
};

describe("UpdateBook", () => {
  describe("Constructor", () => {
    it("Should be an instance of UpdateBook", () => {
      expect(new UpdateBook(repositoryMock)).toBeInstanceOf(UpdateBook);
    });
  });

  describe("execute", () => {
    it("Should return instance of BookUpdateOutputBoundary", async () => {
      repositoryMock.getOne.mockResolvedValue(dbBookExample);
      repositoryMock.update.mockResolvedValue(dbBookExample);

      const bookUpdate = new UpdateBook(repositoryMock);
      expect(bookUpdate.execute(inputBoundaryMock)).resolves.toBeInstanceOf(
        Array,
      );

      const [output] = await bookUpdate.execute(inputBoundaryMock);
      expect(output).toBeInstanceOf(BookOutputBoundary);
      expect(output.get()).toBeInstanceOf(Book);

      expect(repositoryMock.getOne).toHaveBeenCalledWith({
        id: "id-00001",
      });
      expect(repositoryMock.update).toHaveBeenCalledWith({
        title: "O Senhor dos Anéis",
        author: ["J. R. R. Tolkien"],
        edition: "Coleção Nova Fronteira",
        publication_year: 1954,
        publisher: "Nova Fronteira",
        publication_location: "Rio de Janeiro",
        isbn: "9788520908190",
        volume: 1,
        genre: [BookGenre.FANTASY, BookGenre.CLASSICS],
      });
    });

    it("Should throws an error of Book not found.", async () => {
      repositoryMock.getOne.mockResolvedValue(null);

      const bookUpdate = new UpdateBook(repositoryMock);

      expect(bookUpdate.execute(inputBoundaryMock)).rejects.toThrow(
        EntityNotFoundError,
      );
      expect(repositoryMock.getOne).toHaveBeenCalledWith({
        id: "id-00001",
      });
    });

    it("Should throws an error of An internal server error occurred.", async () => {
      repositoryMock.getOne.mockResolvedValue(dbBookExample);
      repositoryMock.update.mockResolvedValue(null);

      const bookUpdate = new UpdateBook(repositoryMock);

      try {
        await bookUpdate.execute(inputBoundaryMock);
      } catch (error) {
        expect(repositoryMock.getOne).toHaveBeenCalledWith({
          id: "id-00001",
        });
        expect(repositoryMock.update).toHaveBeenCalledWith({
          title: "O Senhor dos Anéis",
          author: ["J. R. R. Tolkien"],
          edition: "Coleção Nova Fronteira",
          publication_year: 1954,
          publisher: "Nova Fronteira",
          publication_location: "Rio de Janeiro",
          isbn: "9788520908190",
          volume: 1,
          genre: [BookGenre.FANTASY, BookGenre.CLASSICS],
        });
        expect(error).toEqual(new InternalError());
      }
    });
  });
});
