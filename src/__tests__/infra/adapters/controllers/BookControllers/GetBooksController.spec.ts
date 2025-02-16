import { presenterMock } from "@/__tests__/__mocks__/adapterMock";
import { dbBookExample } from "@/__tests__/__mocks__/bookMock";
import { repositoryMock } from "@/__tests__/__mocks__/mocks";
import { DBOutputBookData } from "@/domain/application/@types/BookTypes";
import BookOutputBoundary from "@/domain/application/Book/BookOutputBoundary";
import UseCase from "@/domain/application/UseCase";
import GetBooksController from "@/infra/adapters/controllers/BookControllers/GetBooksController";
import ResponseObject from "@/infra/adapters/controllers/http/protocols/ResponseObject";
import HTTPRequest from "@/infra/interfaces/HTTPRequest";

const bookUseCaseMock: jest.Mocked<
  UseCase<{ take?: number }, DBOutputBookData>
> = {
  repository: repositoryMock,
  execute: jest.fn(),
};

const httpRequestMockBook: jest.Mocked<HTTPRequest> = {
  query: { take: 10 },
};
const httpRequestMockBookWithoutQuery: jest.Mocked<HTTPRequest> = {
  query: {},
};

describe("GetBooksController", () => {
  describe("Constructor", () => {
    it("Should be an instance of CreateBookController.", () => {
      expect(
        new GetBooksController(presenterMock, bookUseCaseMock),
      ).toBeInstanceOf(GetBooksController);
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

      const controller = new GetBooksController(presenterMock, bookUseCaseMock);

      expect(controller.handle(httpRequestMockBook)).resolves.toBeInstanceOf(
        ResponseObject,
      );
      const response = await controller.handle(httpRequestMockBook);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual([responseBook]);
      expect(bookUseCaseMock.execute).toHaveBeenCalled();
      expect(presenterMock.output).toHaveBeenCalled();
    });

    it("Should be an instance of ResponseObject, without query param.", async () => {
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

      const controller = new GetBooksController(presenterMock, bookUseCaseMock);

      expect(
        controller.handle(httpRequestMockBookWithoutQuery),
      ).resolves.toBeInstanceOf(ResponseObject);
      const response = await controller.handle(httpRequestMockBookWithoutQuery);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual([responseBook]);
      expect(bookUseCaseMock.execute).toHaveBeenCalled();
      expect(presenterMock.output).toHaveBeenCalled();
    });
  });
});
