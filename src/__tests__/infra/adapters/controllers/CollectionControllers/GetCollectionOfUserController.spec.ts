import { presenterMock } from "@/__tests__/__mocks__/adapterMock";
import { dbCollectionExample } from "@/__tests__/__mocks__/collectionMock";
import { repositoryMock } from "@/__tests__/__mocks__/mocks";
import { DBOutputCollectionData } from "@/domain/application/@types/CollectionTypes";
import CollectionOutputBoundary from "@/domain/application/Collection/CollectionOutputBoundary";
import UseCase from "@/domain/application/UseCase";
import GetCollectionOfUserController from "@/infra/adapters/controllers/CollectionController/GetCollectionOfUserController";
import ResponseObject from "@/infra/adapters/controllers/http/protocols/ResponseObject";
import HTTPRequest from "@/infra/interfaces/HTTPRequest";

const collectionUseCaseMock: jest.Mocked<
  UseCase<{ user_id: string; access_private: boolean }, DBOutputCollectionData>
> = {
  repository: repositoryMock,
  execute: jest.fn(),
};
const httpRequestMockCollection: jest.Mocked<HTTPRequest> = {
  params: { user_id: "id-00001" },
  body: { access_private: true },
};

describe("GetCollectionOfUserController", () => {
  describe("Constructor", () => {
    it("Should be an instance of GetCollectionOfUserController.", () => {
      expect(
        new GetCollectionOfUserController(presenterMock, collectionUseCaseMock),
      ).toBeInstanceOf(GetCollectionOfUserController);
    });
  });

  describe("handle", () => {
    it("Should be an instance of ResponseObject.", async () => {
      const collectionOutput = {
        _id: "000001",
        title: "Livros de Tolkien",
        visibility: "private",
      };
      collectionUseCaseMock.execute.mockResolvedValue([
        new CollectionOutputBoundary(
          dbCollectionExample as DBOutputCollectionData,
        ),
      ]);
      presenterMock.output.mockReturnValue(collectionOutput);

      const controller = new GetCollectionOfUserController(
        presenterMock,
        collectionUseCaseMock,
      );

      expect(
        controller.handle(httpRequestMockCollection),
      ).resolves.toBeInstanceOf(ResponseObject);
      const response = await controller.handle(httpRequestMockCollection);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual([collectionOutput]);
      expect(collectionUseCaseMock.execute).toHaveBeenCalled();
      expect(presenterMock.output).toHaveBeenCalled();
    });
  });
});
