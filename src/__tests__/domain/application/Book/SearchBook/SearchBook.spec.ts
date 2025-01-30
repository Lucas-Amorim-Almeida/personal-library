import { dbBookExample } from "@/__tests__/__mocks__/bookMock";
import { repositoryMock } from "@/__tests__/__mocks__/mocks";
import BookOutputBoundary from "@/domain/application/Book/BookOutputBoundary";
import SearchBook from "@/domain/application/Book/SearchBook/SearchBook";
import InputBoundary from "@/domain/application/InputBoundary";

const inputBoundaryMock: jest.Mocked<
  InputBoundary<{ query: string; take: number }>
> = {
  get: jest.fn(() => ({ query: "Tolkien", take: 10 })),
};

describe("SearchBook", () => {
  describe("Constructor", () => {
    it("Should be an instance of SearchBook", () => {
      expect(new SearchBook(repositoryMock)).toBeInstanceOf(SearchBook);
    });
  });

  describe("execute", () => {
    it("Should return an instance of Book.", async () => {
      repositoryMock.getMany.mockResolvedValue([dbBookExample]);

      const search = new SearchBook(repositoryMock);
      expect(search.execute(inputBoundaryMock)).resolves.toBeInstanceOf(Array);

      const result = await search.execute(inputBoundaryMock);
      result.forEach((item) => {
        expect(item).toBeInstanceOf(BookOutputBoundary);
      });
      expect(repositoryMock.getMany).toHaveBeenCalledWith(
        {
          query: "Tolkien",
        },
        10,
      );
    });
  });
});
