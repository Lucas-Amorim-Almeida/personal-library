import { presenterMock } from "@/__tests__/__mocks__/adapterMock";
import { dbBookExample } from "@/__tests__/__mocks__/bookMock";
import { repositoryMock } from "@/__tests__/__mocks__/mocks";
import { DBOutputBookData } from "@/domain/application/@types/BookTypes";
import BookOutputBoundary from "@/domain/application/Book/BookOutputBoundary";
import UseCase from "@/domain/application/UseCase";
import SearchBookController from "@/infra/adapters/controllers/BookControllers/SearchBookController";
import ResponseObject from "@/infra/adapters/controllers/http/protocols/ResponseObject";
import HTTPRequest from "@/infra/interfaces/HTTPRequest";

const bookUseCaseMock: jest.Mocked<
  UseCase<
    {
      title?: string;
      author?: string;
      take?: number;
    },
    DBOutputBookData
  >
> = {
  repository: repositoryMock,
  execute: jest.fn(),
};

const httpRequestMockBook: jest.Mocked<HTTPRequest> = {
  query: {
    title: "O Senhor dos Anéis",
    take: 10,
  },
};
const httpRequestMockBookWithoutTake: jest.Mocked<HTTPRequest> = {
  query: { title: "O Senhor dos Anéis" },
};

describe("SearchBookController", () => {
  describe("Constructor", () => {
    it("Should be an instance of CreateBookController.", () => {
      expect(
        new SearchBookController(presenterMock, bookUseCaseMock),
      ).toBeInstanceOf(SearchBookController);
    });
  });

  describe("handle", () => {
    it("Should be an instance of ResponseObject.", async () => {
      const responseBook = {
        _id: "id-00001",
        title: "O Senhor dos Anéis",
        author: ["J. R. R. Tolkien"],
        publication_year: 1954,
        genre: ["Fantasia", "Clássicos"],
      };

      bookUseCaseMock.execute.mockResolvedValue([
        new BookOutputBoundary(dbBookExample),
      ]);
      presenterMock.output.mockReturnValue(responseBook);

      const controller = new SearchBookController(
        presenterMock,
        bookUseCaseMock,
      );

      expect(controller.handle(httpRequestMockBook)).resolves.toBeInstanceOf(
        ResponseObject,
      );
      const response = await controller.handle(httpRequestMockBook);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual([responseBook]);
      expect(bookUseCaseMock.execute).toHaveBeenCalled();
      expect(presenterMock.output).toHaveBeenCalled();
    });

    it("Should be an instance of ResponseObject, without take param.", async () => {
      const responseBook = {
        _id: "id-00001",
        title: "O Senhor dos Anéis",
        author: ["J. R. R. Tolkien"],
        publication_year: 1954,
        genre: ["Fantasia", "Clássicos"],
      };

      bookUseCaseMock.execute.mockResolvedValue([
        new BookOutputBoundary(dbBookExample),
      ]);
      presenterMock.output.mockReturnValue(responseBook);

      const controller = new SearchBookController(
        presenterMock,
        bookUseCaseMock,
      );

      expect(
        controller.handle(httpRequestMockBookWithoutTake),
      ).resolves.toBeInstanceOf(ResponseObject);
      const response = await controller.handle(httpRequestMockBookWithoutTake);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual([responseBook]);
      expect(bookUseCaseMock.execute).toHaveBeenCalled();
      expect(presenterMock.output).toHaveBeenCalled();
    });
  });
});
