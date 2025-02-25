import {
  httpRequestMockUser,
  presenterMock,
  userUseCaseMock,
} from "@/__tests__/__mocks__/adapterMock";
import { dbUserExample } from "@/__tests__/__mocks__/mocks";
import UserOutputBoundary from "@/domain/application/User/UserOutputBoundary";
import ResponseObject from "@/infra/adapters/controllers/http/protocols/ResponseObject";
import CreateUserController from "@/infra/adapters/controllers/UserControllers/CreateUserController";

describe("CreateUserController", () => {
  describe("Constructor", () => {
    it("Should be an instance of CreateUserController.", () => {
      expect(
        new CreateUserController(presenterMock, userUseCaseMock),
      ).toBeInstanceOf(CreateUserController);
    });
  });

  describe("handle", () => {
    it("Should be an instance of ResponseObject.", async () => {
      userUseCaseMock.execute.mockResolvedValue([
        new UserOutputBoundary(dbUserExample),
      ]);
      presenterMock.output.mockReturnValue({
        id: "id-0001",
        username: "john_doe",
        status: "ATIVO",
      });

      const controller = new CreateUserController(
        presenterMock,
        userUseCaseMock,
      );

      expect(controller.handle(httpRequestMockUser)).resolves.toBeInstanceOf(
        ResponseObject,
      );
      const response = await controller.handle(httpRequestMockUser);
      expect(response.statusCode).toBe(201);
      expect(response.isTokenGenRequired).toBe(true);
      expect(response.body).toEqual({
        id: "id-0001",
        username: "john_doe",
        status: "ATIVO",
      });
      expect(userUseCaseMock.execute).toHaveBeenCalled();
      expect(presenterMock.output).toHaveBeenCalled();
    });
  });
});
