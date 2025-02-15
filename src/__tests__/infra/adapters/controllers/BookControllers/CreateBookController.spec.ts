import {
  bookUseCaseMock,
  httpRequestMockBook,
  presenterMock,
} from "@/__tests__/__mocks__/adapterMock";
import { dbBookExample } from "@/__tests__/__mocks__/bookMock";
import BookOutputBoundary from "@/domain/application/Book/BookOutputBoundary";
import CreateBookController from "@/infra/adapters/controllers/BookControllers/CreateBookController";
import ResponseObject from "@/infra/adapters/controllers/http/protocols/ResponseObject";

describe("CreateBookController", () => {
  describe("Constructor", () => {
    it("Should be an instance of CreateBookController.", () => {
      expect(
        new CreateBookController(presenterMock, bookUseCaseMock),
      ).toBeInstanceOf(CreateBookController);
    });
  });

  describe("handle", () => {
    it("Should be an instance of ResponseObject.", async () => {
      bookUseCaseMock.execute.mockResolvedValue([
        new BookOutputBoundary(dbBookExample),
      ]);
      presenterMock.output.mockReturnValue(dbBookExample);

      const controller = new CreateBookController(
        presenterMock,
        bookUseCaseMock,
      );

      expect(controller.handle(httpRequestMockBook)).resolves.toBeInstanceOf(
        ResponseObject,
      );
      const response = await controller.handle(httpRequestMockBook);
      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual(dbBookExample);
      expect(bookUseCaseMock.execute).toHaveBeenCalled();
      expect(presenterMock.output).toHaveBeenCalled();
    });
  });
});
