import { presenterMock } from "@/__tests__/__mocks__/adapterMock";
import { dbBookExample } from "@/__tests__/__mocks__/bookMock";
import { repositoryMock } from "@/__tests__/__mocks__/mocks";
import { DBOutputBookData } from "@/domain/application/@types/BookTypes";
import BookOutputBoundary from "@/domain/application/Book/BookOutputBoundary";
import UseCase from "@/domain/application/UseCase";
import GetBookByIdController from "@/infra/adapters/controllers/BookControllers/GetBookByIdController";
import ResponseObject from "@/infra/adapters/controllers/http/protocols/ResponseObject";
import HTTPRequest from "@/infra/interfaces/HTTPRequest";

const bookUseCaseMock: jest.Mocked<UseCase<{ id: string }, DBOutputBookData>> =
  {
    repository: repositoryMock,
    execute: jest.fn(),
  };

const httpRequestMockBook: jest.Mocked<HTTPRequest> = {
  params: { id: "id-00001" },
};

describe("GetBookByIdController", () => {
  describe("Constructor", () => {
    it("Should be an instance of GetBookByIdController.", () => {
      expect(
        new GetBookByIdController(presenterMock, bookUseCaseMock),
      ).toBeInstanceOf(GetBookByIdController);
    });
  });

  describe("handle", () => {
    it("Should be an instance of ResponseObject.", async () => {
      bookUseCaseMock.execute.mockResolvedValue([
        new BookOutputBoundary(dbBookExample),
      ]);
      presenterMock.output.mockReturnValue(dbBookExample);

      const controller = new GetBookByIdController(
        presenterMock,
        bookUseCaseMock,
      );

      expect(controller.handle(httpRequestMockBook)).resolves.toBeInstanceOf(
        ResponseObject,
      );
      const response = await controller.handle(httpRequestMockBook);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(dbBookExample);
      expect(bookUseCaseMock.execute).toHaveBeenCalled();
      expect(presenterMock.output).toHaveBeenCalled();
    });
  });
});
