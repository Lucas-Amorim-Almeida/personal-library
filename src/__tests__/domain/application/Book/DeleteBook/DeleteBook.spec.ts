import { dbBookExample } from "@/__tests__/__mocks__/bookMock";
import { repositoryMock } from "@/__tests__/__mocks__/mocks";
import DeleteBook from "@/domain/application/Book/DeleteBook/DeleteBook";
import EntityNotFoundError from "@/domain/application/Errors/EntityNotFoundError";
import InputBoundary from "@/domain/application/InputBoundary";

const inputMock: jest.Mocked<InputBoundary<{ id: string }>> = {
  get: jest.fn(() => ({ id: "id-book00001" })),
};

describe("DeleteBook", () => {
  describe("Constructor", () => {
    it("Should be an instance of DeleteBook", () => {
      expect(new DeleteBook(repositoryMock)).toBeInstanceOf(DeleteBook);
    });
  });

  describe("execute", () => {
    it("Should return an instance of DeleteBookOutputBoundary", async () => {
      repositoryMock.delete.mockResolvedValue(dbBookExample);
      repositoryMock.getOne.mockResolvedValue(null);

      const deleteBook = new DeleteBook(repositoryMock);

      expect(deleteBook.execute(inputMock)).resolves.toBeInstanceOf(Array);

      const [response] = await deleteBook.execute(inputMock);
      expect(response.get()).toBe(true);
      expect(repositoryMock.delete).toHaveBeenCalledWith({
        _id: "id-book00001",
      });
      expect(repositoryMock.getOne).toHaveBeenCalledWith({
        _id: "id-book00001",
      });
    });

    it("Should fail in delete book in db.", async () => {
      repositoryMock.delete.mockResolvedValue(dbBookExample);
      repositoryMock.getOne.mockResolvedValue(dbBookExample);

      const deleteBook = new DeleteBook(repositoryMock);

      expect(deleteBook.execute(inputMock)).resolves.toBeInstanceOf(Array);

      const [response] = await deleteBook.execute(inputMock);
      expect(response.get()).toBe(false);
      expect(repositoryMock.delete).toHaveBeenCalledWith({
        _id: "id-book00001",
      });
      expect(repositoryMock.getOne).toHaveBeenCalledWith({
        _id: "id-book00001",
      });
    });

    it("Should fail in delete book in db, because book not found.", async () => {
      repositoryMock.delete.mockResolvedValue(null);

      const deleteBook = new DeleteBook(repositoryMock);

      try {
        await deleteBook.execute(inputMock);
      } catch (error) {
        expect(repositoryMock.delete).toHaveBeenCalledWith({
          _id: "id-book00001",
        });
        expect(error).toEqual(new EntityNotFoundError("Book"));
      }
    });
  });
});
