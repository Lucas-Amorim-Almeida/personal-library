import { dbBookExample } from "@/__tests__/__mocks__/bookMock";
import { repositoryMock } from "@/__tests__/__mocks__/mocks";
import DeleteBookOutputBoundary from "@/domain/application/Book/DeleteBook/DeleteBookOutputBoundary";
import UseCase from "@/domain/application/UseCase";
import DeleteBookController from "@/infra/adapters/controllers/BookControllers/DeleteBookController";
import ResponseObject from "@/infra/adapters/controllers/http/protocols/ResponseObject";
import InternalServerError from "@/infra/http/Errors/InternalServerError";
import HTTPRequest from "@/infra/interfaces/HTTPRequest";

const httpRequestMock: jest.Mocked<HTTPRequest> = {
  params: { id: "id-0001" },
};

export const bookUseCaseMock: jest.Mocked<UseCase<{ id: string }, boolean>> = {
  repository: repositoryMock,
  execute: jest.fn(),
};

describe("DeleteBookController", () => {
  describe("Constructor", () => {
    it("Should be an instance of DeleteBookController.", () => {
      expect(new DeleteBookController(bookUseCaseMock)).toBeInstanceOf(
        DeleteBookController,
      );
    });
  });

  describe("handle", () => {
    it("Should be an instance of ResponseObject.", async () => {
      bookUseCaseMock.execute.mockResolvedValue([
        new DeleteBookOutputBoundary(dbBookExample),
      ]);

      const controller = new DeleteBookController(bookUseCaseMock);

      expect(controller.handle(httpRequestMock)).resolves.toBeInstanceOf(
        ResponseObject,
      );
      const response = await controller.handle(httpRequestMock);
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeUndefined();
      expect(bookUseCaseMock.execute).toHaveBeenCalled();
    });

    it("Should throws an error of InternalServerError when fail to delete book entity.", async () => {
      bookUseCaseMock.execute.mockResolvedValue([
        new DeleteBookOutputBoundary(null),
      ]);

      const controller = new DeleteBookController(bookUseCaseMock);

      expect(controller.handle(httpRequestMock)).resolves.toBeInstanceOf(
        ResponseObject,
      );
      try {
        await controller.handle(httpRequestMock);
      } catch (error) {
        expect(bookUseCaseMock.execute).toHaveBeenCalled();
        expect(error).toEqual(new InternalServerError());
      }
    });
  });
});
