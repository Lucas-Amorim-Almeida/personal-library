import CreateBook from "@/domain/application/Book/CreateBook/CreateBook";
import BookOutputBoundary from "@/domain/application/Book/BookOutputBoundary";
import InputBoundary from "@/domain/application/InputBoundary";
import Book from "@/domain/core/Book";
import BookGenre from "@/domain/core/BookGenre";
import { dbBookExample } from "@/__tests__/__mocks__/bookMock";
import { repositoryMock } from "@/__tests__/__mocks__/mocks";
import BookAlreadyExistsError from "@/domain/application/Errors/BookUseCaseError/BookAlreadyExistsError";
import InternalError from "@/domain/application/Errors/InternalError";

const book = new Book({
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

const inputMock: jest.Mocked<InputBoundary<Book>> = {
  get: jest.fn(() => book),
};

describe("CreateBook", () => {
  describe("Constructor", () => {
    it("Should be an instance of CreateBook", () => {
      expect(new CreateBook(repositoryMock)).toBeInstanceOf(CreateBook);
    });
  });

  describe("execute", () => {
    it("Should return an instance of CreateBookOutputBoundary", async () => {
      const createBook = new CreateBook(repositoryMock);

      repositoryMock.getOne.mockResolvedValue(null);
      repositoryMock.save.mockResolvedValue(dbBookExample);

      expect(createBook.execute(inputMock)).resolves.toBeInstanceOf(Array);

      const [output] = await createBook.execute(inputMock);
      expect(output).toBeInstanceOf(BookOutputBoundary);
      expect(output.get()).toBeInstanceOf(Book);
      expect(repositoryMock.getOne).toHaveBeenCalledWith({ book });
      expect(repositoryMock.save).toHaveBeenCalledWith(expect.any(Book));
    });

    it("Should throws an error of The Book already exists in the database.", async () => {
      const createBook = new CreateBook(repositoryMock);
      repositoryMock.getOne.mockResolvedValue(dbBookExample);

      expect(createBook.execute(inputMock)).rejects.toThrow(
        BookAlreadyExistsError,
      );
      expect(repositoryMock.getOne).toHaveBeenCalledWith({ book });
    });

    it("Should throws an error of An internal server error occurred.", async () => {
      const createBook = new CreateBook(repositoryMock);

      repositoryMock.getOne.mockResolvedValue(null);
      repositoryMock.save.mockResolvedValue(null);

      try {
        await createBook.execute(inputMock);
      } catch (error) {
        expect(repositoryMock.getOne).toHaveBeenCalledWith({ book });
        expect(repositoryMock.save).toHaveBeenCalledWith(expect.any(Book));
        expect(error).toEqual(new InternalError());
      }
    });
  });
});
