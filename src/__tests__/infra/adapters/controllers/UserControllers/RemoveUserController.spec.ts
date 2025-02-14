import {
  dbContactExample,
  dbPersonalDataExample,
  dbUserExample,
  repositoryMock,
} from "@/__tests__/__mocks__/mocks";
import UseCase from "@/domain/application/UseCase";
import RemoveUserOutputBoundary from "@/domain/application/User/RemoveUser/RemoveUserOutputBoundary";
import ResponseObject from "@/infra/adapters/controllers/http/protocols/ResponseObject";
import RemoveUserController from "@/infra/adapters/controllers/UserControllers/RemoveUserController";
import InternalServerError from "@/infra/http/Errors/InternalServerError";
import HTTPRequest from "@/infra/interfaces/HTTPRequest";

const httpRequestMock: jest.Mocked<HTTPRequest> = {
  params: { id: "id-0001" },
  body: { status: "SUSPENSO" },
};

export const userUseCaseMock: jest.Mocked<UseCase<{ id: string }, boolean>> = {
  repository: repositoryMock,
  execute: jest.fn(),
};

describe("RemoveUserController", () => {
  describe("Constructor", () => {
    it("Should be an instance of RemoveUserController.", () => {
      expect(new RemoveUserController(userUseCaseMock)).toBeInstanceOf(
        RemoveUserController,
      );
    });
  });

  describe("handle", () => {
    it("Should be an instance of ResponseObject.", async () => {
      userUseCaseMock.execute.mockResolvedValue([
        new RemoveUserOutputBoundary({
          id: "id-0001",
          username: "john_doe",
          password: "1234",
          access_level: "COMMON",
          status: "A DELETAR",
          contact: dbContactExample,
          personal_data: dbPersonalDataExample,
          created_at: new Date(2020, 2, 22),
          updated_at: new Date(2022, 2, 22),
        }),
      ]);

      const controller = new RemoveUserController(userUseCaseMock);

      expect(controller.handle(httpRequestMock)).resolves.toBeInstanceOf(
        ResponseObject,
      );
      const response = await controller.handle(httpRequestMock);
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeUndefined();
      expect(userUseCaseMock.execute).toHaveBeenCalled();
    });

    it("Should throws an error of InternalServerError when fail to delete user entity.", async () => {
      userUseCaseMock.execute.mockResolvedValue([
        new RemoveUserOutputBoundary(dbUserExample),
      ]);

      const controller = new RemoveUserController(userUseCaseMock);

      expect(controller.handle(httpRequestMock)).resolves.toBeInstanceOf(
        ResponseObject,
      );
      try {
        await controller.handle(httpRequestMock);
      } catch (error) {
        expect(userUseCaseMock.execute).toHaveBeenCalled();
        expect(error).toEqual(new InternalServerError());
      }
    });
  });
});
