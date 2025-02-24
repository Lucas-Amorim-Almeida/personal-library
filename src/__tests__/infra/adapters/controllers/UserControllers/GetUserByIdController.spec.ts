import { presenterMock } from "@/__tests__/__mocks__/adapterMock";
import {
  dbContactExample,
  dbPersonalDataExample,
  dbUserExample,
  repositoryMock,
} from "@/__tests__/__mocks__/mocks";
import { DBOutputUserData } from "@/domain/application/@types/UserTypes";
import UseCase from "@/domain/application/UseCase";
import UserOutputBoundary from "@/domain/application/User/UserOutputBoundary";
import ResponseObject from "@/infra/adapters/controllers/http/protocols/ResponseObject";
import GetUserByIdController from "@/infra/adapters/controllers/UserControllers/GetUserByIdController";
import HTTPRequest from "@/infra/interfaces/HTTPRequest";

const httpRequestMock: jest.Mocked<HTTPRequest> = {
  params: { id: "id-000001" },
};

export const userUseCaseMock: jest.Mocked<
  UseCase<{ id: string }, DBOutputUserData>
> = {
  repository: repositoryMock,
  execute: jest.fn(),
};

describe("GetUserByIdController", () => {
  describe("Constructor", () => {
    it("Should be an instance of GetUserByIdController.", () => {
      expect(
        new GetUserByIdController(presenterMock, userUseCaseMock),
      ).toBeInstanceOf(GetUserByIdController);
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
        access_level: "COMMON",
        contact: dbContactExample,
        personal_data: dbPersonalDataExample,
      });

      const controller = new GetUserByIdController(
        presenterMock,
        userUseCaseMock,
      );

      expect(controller.handle(httpRequestMock)).resolves.toBeInstanceOf(
        ResponseObject,
      );
      const response = await controller.handle(httpRequestMock);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        id: "id-0001",
        username: "john_doe",
        status: "ATIVO",
        access_level: "COMMON",
        contact: dbContactExample,
        personal_data: dbPersonalDataExample,
      });
      expect(userUseCaseMock.execute).toHaveBeenCalled();
      expect(presenterMock.output).toHaveBeenCalled();
    });
  });
});
