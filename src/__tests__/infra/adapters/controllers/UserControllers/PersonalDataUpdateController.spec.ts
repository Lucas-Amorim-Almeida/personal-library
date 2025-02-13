import { repositoryMock } from "@/__tests__/__mocks__/mocks";
import { DBOutputPersonalData } from "@/domain/application/@types/UserTypes";
import UseCase from "@/domain/application/UseCase";
import PersonalDataUpdateOutputBoundary from "@/domain/application/User/PersonalDataUpdate/PersonalDataUpdateOutputBoundary";
import ResponseObject from "@/infra/adapters/controllers/http/protocols/ResponseObject";
import PersonalDataUpdateController from "@/infra/adapters/controllers/UserControllers/PersonalDataUpdateController";
import HTTPRequest from "@/infra/interfaces/HTTPRequest";

const inputParams = {
  user_id: "id-0001",
  email: "email@example.com",
  phone: ["+5511911111111"],
};

const httpRequestMock: jest.Mocked<HTTPRequest> = {
  body: inputParams,
};

export const userUseCaseMock: jest.Mocked<
  UseCase<
    { user_id: string; name?: string; birth_date?: Date },
    DBOutputPersonalData
  >
> = {
  repository: repositoryMock,
  execute: jest.fn(),
};

describe("PersonalDataUpdateController", () => {
  describe("Constructor", () => {
    it("Should be an instance of PersonalDataUpdateController.", () => {
      expect(new PersonalDataUpdateController(userUseCaseMock)).toBeInstanceOf(
        PersonalDataUpdateController,
      );
    });
  });

  describe("handle", () => {
    it("Should be an instance of ResponseObject.", async () => {
      userUseCaseMock.execute.mockResolvedValue([
        new PersonalDataUpdateOutputBoundary({
          name: "Other name",
          birth_date: new Date(2020, 2, 2),
          created_at: new Date(2020, 2, 2),
          updated_at: new Date(2022, 2, 22),
        }),
      ]);

      const controller = new PersonalDataUpdateController(userUseCaseMock);

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
