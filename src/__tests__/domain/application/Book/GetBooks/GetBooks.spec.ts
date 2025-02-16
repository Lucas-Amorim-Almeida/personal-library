import {
  dbBookExample,
  dbBookExample2,
  dbBookExample3,
  dbBookExample4,
} from "@/__tests__/__mocks__/bookMock";
import { repositoryMock } from "@/__tests__/__mocks__/mocks";
import BookOutputBoundary from "@/domain/application/Book/BookOutputBoundary";
import GetBooks from "@/domain/application/Book/GetBooks/GetBooks";
import InputBoundary from "@/domain/application/InputBoundary";

const inputBoundaryMock: jest.Mocked<InputBoundary<{ take?: number }>> = {
  get: jest.fn(() => ({ take: 2 })),
};
const inputBoundaryMockWithoutTake: jest.Mocked<
  InputBoundary<{ take?: number }>
> = {
  get: jest.fn(() => ({})),
};

describe("GetBooks", () => {
  describe("Constructor", () => {
    it("Should be an instance of GetBooks", () => {
      expect(new GetBooks(repositoryMock)).toBeInstanceOf(GetBooks);
    });
  });

  describe("execute", () => {
    it("Should return an instance of BookOutputBoundary.", async () => {
      repositoryMock.getMany.mockResolvedValue([dbBookExample, dbBookExample2]);

      const search = new GetBooks(repositoryMock);
      expect(search.execute(inputBoundaryMock)).resolves.toBeInstanceOf(Array);

      const result = await search.execute(inputBoundaryMock);
      result.forEach((item) => {
        expect(item).toBeInstanceOf(BookOutputBoundary);
      });
      expect(repositoryMock.getMany).toHaveBeenCalledWith({}, 2);
    });
    it("Should return an instance of BookOutputBoundary.", async () => {
      repositoryMock.getAll.mockResolvedValue([
        dbBookExample,
        dbBookExample2,
        dbBookExample3,
        dbBookExample4,
      ]);

      const search = new GetBooks(repositoryMock);
      expect(
        search.execute(inputBoundaryMockWithoutTake),
      ).resolves.toBeInstanceOf(Array);

      const result = await search.execute(inputBoundaryMockWithoutTake);
      result.forEach((item) => {
        expect(item).toBeInstanceOf(BookOutputBoundary);
      });
      expect(repositoryMock.getAll).toHaveBeenCalled();
    });
  });
});
