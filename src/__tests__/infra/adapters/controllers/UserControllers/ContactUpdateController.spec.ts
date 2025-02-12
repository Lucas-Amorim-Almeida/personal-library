import { repositoryMock } from "@/__tests__/__mocks__/mocks";
import { DBOutputContactData } from "@/domain/application/@types/UserTypes";
import UseCase from "@/domain/application/UseCase";
import ContactUpdateOutputBoundary from "@/domain/application/User/ContactUpdate/ContactUpdateOutputBoundary";
import Email from "@/domain/core/valueObjects/Email";
import Phone from "@/domain/core/valueObjects/Phone";
import ResponseObject from "@/infra/adapters/controllers/http/protocols/ResponseObject";
import ContactUpdateController from "@/infra/adapters/controllers/UserControllers/ContactUpdateController";
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
    { user_id: string; email?: Email; phone?: Phone[] },
    DBOutputContactData
  >
> = {
  repository: repositoryMock,
  execute: jest.fn(),
};

describe("LoginController", () => {
  describe("Constructor", () => {
    it("Should be an instance of LoginController.", () => {
      expect(new ContactUpdateController(userUseCaseMock)).toBeInstanceOf(
        ContactUpdateController,
      );
    });
  });

  describe("handle", () => {
    it("Should be an instance of ResponseObject.", async () => {
      userUseCaseMock.execute.mockResolvedValue([
        new ContactUpdateOutputBoundary({
          email: "email@example.com",
          phone: ["+5511911111111"],
          created_at: new Date(2020, 2, 2),
          updated_at: new Date(2022, 2, 22),
        }),
      ]);

      const controller = new ContactUpdateController(userUseCaseMock);

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
