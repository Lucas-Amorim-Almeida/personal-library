import {
  dbBookExample,
  dbUserExample,
  repositoryMock,
} from "@/__tests__/__mocks__/mocks";
import CreateBook from "@/application/Book/CreateBook/CreateBook";
import CreateBookOutputBoundary from "@/application/Book/CreateBook/CreateBookOutputBoundary";
import InputBoundary from "@/application/InputBoundary";
import Book from "@/core/Book";
import BookGenre from "@/core/BookGenre";
import ReadingStatus from "@/core/ReadingStatus";

const inputParams = {
  user_id: "id-00001",
  book: new Book({
    title: "O Senhor dos Anéis",
    author: ["J. R. R. Tolkien"],
    edition: "Coleção Nova Fronteira",
    publication_year: 1954,
    publisher: "Nova Fronteira",
    publication_location: "Rio de Janeiro",
    isbn: "9788520908190",
    volume: 1,
    genre: [BookGenre.FANTASY, BookGenre.CLASSICS],
    status: ReadingStatus.COMPLETED,
  }),
};

const inputMock: jest.Mocked<InputBoundary<{ user_id: string; book: Book }>> = {
  get: jest.fn(() => inputParams),
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

      repositoryMock.getOne.mockResolvedValue(dbUserExample);
      repositoryMock.save.mockResolvedValue(dbBookExample);

      expect(createBook.execute(inputMock)).resolves.toBeInstanceOf(
        CreateBookOutputBoundary,
      );
      const output = await createBook.execute(inputMock);
      expect(output.get()).toBeInstanceOf(Book);
    });

    it("Should throws an error of User not found.", async () => {
      const createBook = new CreateBook(repositoryMock);
      repositoryMock.getOne.mockResolvedValue(null);

      expect(createBook.execute(inputMock)).rejects.toThrow("User not found.");
    });

    it("Should throws an error of An internal server error occurred.", async () => {
      const createBook = new CreateBook(repositoryMock);

      repositoryMock.getOne.mockResolvedValue(dbUserExample);
      repositoryMock.save.mockResolvedValue(null);

      expect(createBook.execute(inputMock)).rejects.toThrow(
        "An internal server error occurred.",
      );
    });
  });
});
