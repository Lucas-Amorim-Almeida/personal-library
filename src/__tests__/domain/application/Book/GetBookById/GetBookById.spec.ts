import { dbBookExample } from "@/__tests__/__mocks__/bookMock";
import { repositoryMock } from "@/__tests__/__mocks__/mocks";
import GetBookById from "@/domain/application/Book/GetBookByID/GetBookById";
import EntityNotFoundError from "@/domain/application/Errors/EntityNotFoundError";
import InputBoundary from "@/domain/application/InputBoundary";

const inputBoundaryMock: jest.Mocked<InputBoundary<{ id: string }>> = {
  get: jest.fn(() => ({ id: "id-00001" })),
};

describe("GetBookById", () => {
  describe("Constructor", () => {
    it("Should be an instance of GetBookById", () => {
      expect(new GetBookById(repositoryMock)).toBeInstanceOf(GetBookById);
    });
  });

  describe("execute", () => {
    it("Should return an object like dbBookExample.", async () => {
      repositoryMock.getOne.mockResolvedValue(dbBookExample);

      const book = new GetBookById(repositoryMock);
      expect(book.execute(inputBoundaryMock)).resolves.toBeInstanceOf(Array);

      const [result] = await book.execute(inputBoundaryMock);
      expect(result.get()).toEqual(dbBookExample);

      expect(repositoryMock.getOne).toHaveBeenCalledWith({ _id: "id-00001" });
    });

    it("Should throws an error of Book not found.", async () => {
      repositoryMock.getOne.mockResolvedValue(null);

      const book = new GetBookById(repositoryMock);

      try {
        await book.execute(inputBoundaryMock);
      } catch (error) {
        expect(repositoryMock.getOne).toHaveBeenCalledWith({ _id: "id-00001" });
        expect(error).toEqual(new EntityNotFoundError("Book"));
      }
    });
  });
});
