import { presenterMock } from "@/__tests__/__mocks__/adapterMock";
import { dbUserExample, repositoryMock } from "@/__tests__/__mocks__/mocks";
import {
  DBOutputUserData,
  InputChangePassword,
} from "@/domain/application/@types/UserTypes";
import UseCase from "@/domain/application/UseCase";
import UserOutputBoundary from "@/domain/application/User/UserOutputBoundary";
import ResponseObject from "@/infra/adapters/controllers/http/protocols/ResponseObject";
import ChangePasswordController from "@/infra/adapters/controllers/UserControllers/ChangePasswordController";
import HTTPRequest from "@/infra/interfaces/HTTPRequest";

const credentials = {
  current_password: "12345678",
  new_password: "123456789",
};

const httpRequestMock: jest.Mocked<HTTPRequest> = {
  body: credentials,
};
const userUseCaseMock: jest.Mocked<
  UseCase<InputChangePassword, DBOutputUserData>
> = {
  repository: repositoryMock,
  execute: jest.fn(),
};
describe("ChangePasswordController", () => {
  describe("Constructor", () => {
    it("Should be an instance of LoginController.", () => {
      expect(
        new ChangePasswordController(presenterMock, userUseCaseMock),
      ).toBeInstanceOf(ChangePasswordController);
    });
  });

  describe("handle", () => {
    it("Should be an instance of ResponseObject.", async () => {
      userUseCaseMock.execute.mockResolvedValue([
        new UserOutputBoundary(dbUserExample),
      ]);

      const controller = new ChangePasswordController(
        presenterMock,
        userUseCaseMock,
      );

      expect(controller.handle(httpRequestMock)).resolves.toBeInstanceOf(
        ResponseObject,
      );
      const response = await controller.handle(httpRequestMock);
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeUndefined();
      expect(userUseCaseMock.execute).toHaveBeenCalled();
    });
  });
});
