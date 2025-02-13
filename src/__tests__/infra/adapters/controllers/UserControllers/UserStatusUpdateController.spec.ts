import { dbUserExample, repositoryMock } from "@/__tests__/__mocks__/mocks";
import { DBOutputUserData } from "@/domain/application/@types/UserTypes";
import UseCase from "@/domain/application/UseCase";
import UserOutputBoundary from "@/domain/application/User/UserOutputBoundary";
import UserStatus from "@/domain/core/UserStatus";
import ResponseObject from "@/infra/adapters/controllers/http/protocols/ResponseObject";
import UserStatusUpdateController from "@/infra/adapters/controllers/UserControllers/UserStatusUpdateController";
import HTTPRequest from "@/infra/interfaces/HTTPRequest";

const httpRequestMock: jest.Mocked<HTTPRequest> = {
  params: { id: "id-0001" },
  body: { status: "SUSPENSO" },
};

export const userUseCaseMock: jest.Mocked<
  UseCase<{ id: string; status: UserStatus }, DBOutputUserData>
> = {
  repository: repositoryMock,
  execute: jest.fn(),
};

describe("UserStatusUpdateController", () => {
  describe("Constructor", () => {
    it("Should be an instance of UserStatusUpdateController.", () => {
      expect(new UserStatusUpdateController(userUseCaseMock)).toBeInstanceOf(
        UserStatusUpdateController,
      );
    });
  });

  describe("handle", () => {
    it("Should be an instance of ResponseObject.", async () => {
      userUseCaseMock.execute.mockResolvedValue([
        new UserOutputBoundary(dbUserExample),
      ]);

      const controller = new UserStatusUpdateController(userUseCaseMock);

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
