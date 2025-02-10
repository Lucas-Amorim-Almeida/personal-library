import {
  presenterMock,
  userUseCaseMock,
} from "@/__tests__/__mocks__/adapterMock";
import { dbUserExample } from "@/__tests__/__mocks__/mocks";
import UserOutputBoundary from "@/domain/application/User/UserOutputBoundary";
import ResponseObject from "@/infra/adapters/controllers/http/protocols/ResponseObject";
import LoginController from "@/infra/adapters/controllers/UserControllers/LoginController";
import HTTPRequest from "@/infra/interfaces/HTTPRequest";

const credentials = {
  username: "jonh_doe",
  password: "1234",
};

const httpRequestMock: jest.Mocked<HTTPRequest> = {
  body: credentials,
};

describe("LoginController", () => {
  describe("Constructor", () => {
    it("Should be an instance of LoginController.", () => {
      expect(
        new LoginController(presenterMock, userUseCaseMock),
      ).toBeInstanceOf(LoginController);
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

      const controller = new LoginController(presenterMock, userUseCaseMock);

      expect(controller.handle(httpRequestMock)).resolves.toBeInstanceOf(
        ResponseObject,
      );
      const response = await controller.handle(httpRequestMock);
      expect(response.statusCode).toBe(200);
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
