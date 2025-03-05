import {
  httpRequestMockUser,
  userUseCaseMock,
} from "@/__tests__/__mocks__/adapterMock";
import { dbUserExample } from "@/__tests__/__mocks__/mocks";
import UserOutputBoundary from "@/domain/application/User/UserOutputBoundary";
import ResponseObject from "@/infra/adapters/controllers/http/protocols/ResponseObject";
import CreateUserController from "@/infra/adapters/controllers/UserControllers/CreateUserController";

describe("CreateUserController", () => {
  describe("Constructor", () => {
    it("Should be an instance of CreateUserController.", () => {
      expect(new CreateUserController(userUseCaseMock)).toBeInstanceOf(
        CreateUserController,
      );
    });
  });

  describe("handle", () => {
    it("Should be an instance of ResponseObject.", async () => {
      userUseCaseMock.execute.mockResolvedValue([
        new UserOutputBoundary(dbUserExample),
      ]);

      const controller = new CreateUserController(userUseCaseMock);

      expect(controller.handle(httpRequestMockUser)).resolves.toBeInstanceOf(
        ResponseObject,
      );
      const response = await controller.handle(httpRequestMockUser);
      expect(response.statusCode).toBe(201);
      expect(response.body).toBeUndefined();
      expect(userUseCaseMock.execute).toHaveBeenCalled();
    });
  });
});
