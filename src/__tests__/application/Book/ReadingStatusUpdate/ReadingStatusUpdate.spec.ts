import { dbBookExample, repositoryMock } from "@/__tests__/__mocks__/mocks";
import BookOutputBoundary from "@/application/Book/BookOutputBoundary";
import ReadingStatusUpdate from "@/application/Book/ReadingStatusUpdate/ReadingStatusUpdate";
import InputBoundary from "@/application/InputBoundary";
import Book from "@/core/Book";
import ReadingStatus from "@/core/ReadingStatus";

describe("ReadingStatusUpdate", () => {
  describe("Constructor", () => {
    it("Should be an instance of ReadingStatusUpdate", () => {
      expect(new ReadingStatusUpdate(repositoryMock)).toBeInstanceOf(
        ReadingStatusUpdate,
      );
    });
  });

  describe("execute", () => {
    it("Should return instance of ReadingStatusUpdateOutput", async () => {
      const inputParams = {
        id: "id-00001",
        status: ReadingStatus.DROPPED_OUT,
      };
      const inputBoundaryMock: jest.Mocked<
        InputBoundary<{ id: string; status: ReadingStatus }>
      > = {
        get: jest.fn(() => inputParams),
      };

      repositoryMock.getOne.mockResolvedValue(dbBookExample);
      repositoryMock.update.mockResolvedValue({
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
        status: "LEITURA CANCELADA",
        created_at: new Date(2020, 2, 20),
        updated_at: new Date(2022, 2, 22),
      });

      const statusUpdate = new ReadingStatusUpdate(repositoryMock);
      expect(statusUpdate.execute(inputBoundaryMock)).resolves.toBeInstanceOf(
        BookOutputBoundary,
      );

      const output = await statusUpdate.execute(inputBoundaryMock);

      expect(output.get()).toBeInstanceOf(Book);
      expect(output.get().getStatus()).toEqual(inputParams.status);
    });

    it("Should throws an error of Book not found.", async () => {
      const inputParams = {
        id: "id-00001",
        status: ReadingStatus.DROPPED_OUT,
      };
      const inputBoundaryMock: jest.Mocked<
        InputBoundary<{ id: string; status: ReadingStatus }>
      > = {
        get: jest.fn(() => inputParams),
      };

      repositoryMock.getOne.mockResolvedValue(null);

      const statusUpdate = new ReadingStatusUpdate(repositoryMock);

      expect(statusUpdate.execute(inputBoundaryMock)).rejects.toThrow(
        "Book not found.",
      );
    });

    it("Should throws an error of An internal server error occurred.", async () => {
      const inputParams = {
        id: "id-00001",
        status: ReadingStatus.DROPPED_OUT,
      };
      const inputBoundaryMock: jest.Mocked<
        InputBoundary<{ id: string; status: ReadingStatus }>
      > = {
        get: jest.fn(() => inputParams),
      };

      repositoryMock.getOne.mockResolvedValue(dbBookExample);
      repositoryMock.update.mockResolvedValue(null);

      const statusUpdate = new ReadingStatusUpdate(repositoryMock);

      expect(statusUpdate.execute(inputBoundaryMock)).rejects.toThrow(
        "An internal server error occurred.",
      );
    });
  });
});
