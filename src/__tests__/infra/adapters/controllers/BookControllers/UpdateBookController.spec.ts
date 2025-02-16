import { repositoryMock } from "@/__tests__/__mocks__/mocks";
import {
  DBOutputBookData,
  InputBookUpdate,
} from "@/domain/application/@types/BookTypes";
import BookOutputBoundary from "@/domain/application/Book/BookOutputBoundary";
import UseCase from "@/domain/application/UseCase";
import UpdateBookController from "@/infra/adapters/controllers/BookControllers/UpdateBookController";
import ResponseObject from "@/infra/adapters/controllers/http/protocols/ResponseObject";
import HTTPRequest from "@/infra/interfaces/HTTPRequest";

const inputParams = {
  title: "Lord of the rings",
  author: ["Tolkien"],
};

const bookUseCaseMock: jest.Mocked<UseCase<InputBookUpdate, DBOutputBookData>> =
  {
    repository: repositoryMock,
    execute: jest.fn(),
  };

const httpRequestMockBook: jest.Mocked<HTTPRequest> = {
  params: { id: "id-00001" },
  body: inputParams,
};

describe("UpdateBookController", () => {
  describe("Constructor", () => {
    it("Should be an instance of UpdateBookController.", () => {
      expect(new UpdateBookController(bookUseCaseMock)).toBeInstanceOf(
        UpdateBookController,
      );
    });
  });

  describe("handle", () => {
    it("Should be an instance of ResponseObject.", async () => {
      const responseBook = {
        _id: "id-00001",
        title: "Lord of the rings",
        author: ["Tolkien"],
        edition: "Coleção Nova Fronteira",
        publication_year: 1954,
        publisher: "Nova Fronteira",
        publication_location: "Rio de Janeiro",
        isbn: "9788520908190",
        volume: 1,
        genre: ["Fantasia", "Clássicos"],
        created_at: new Date(2020, 2, 20),
        updated_at: new Date(2022, 2, 22),
      };

      bookUseCaseMock.execute.mockResolvedValue([
        new BookOutputBoundary(responseBook),
      ]);

      const controller = new UpdateBookController(bookUseCaseMock);

      expect(controller.handle(httpRequestMockBook)).resolves.toBeInstanceOf(
        ResponseObject,
      );
      const response = await controller.handle(httpRequestMockBook);
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeUndefined();
      expect(bookUseCaseMock.execute).toHaveBeenCalled();
    });
  });
});
