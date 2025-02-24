import { dbCollectionExample } from "@/__tests__/__mocks__/collectionMock";
import { repositoryMock } from "@/__tests__/__mocks__/mocks";
import { DBOutputCollectionData } from "@/domain/application/@types/CollectionTypes";
import DeleteCollectionOutputBoundary from "@/domain/application/Collection/DeleteCollection/DeleteCollectionOutputBoundary";
import UseCase from "@/domain/application/UseCase";
import DeleteCollectionController from "@/infra/adapters/controllers/CollectionController/DeleteCollectionController";
import ResponseObject from "@/infra/adapters/controllers/http/protocols/ResponseObject";
import HTTPRequest from "@/infra/interfaces/HTTPRequest";

const collectionUseCaseMock: jest.Mocked<UseCase<{ id: string }, boolean>> = {
  repository: repositoryMock,
  execute: jest.fn(),
};
const httpRequestMockCollection: jest.Mocked<HTTPRequest> = {
  params: { id: "id-00001" },
};

describe("DeleteCollectionController", () => {
  describe("Constructor", () => {
    it("Should be an instance of DeleteCollectionController.", () => {
      expect(
        new DeleteCollectionController(collectionUseCaseMock),
      ).toBeInstanceOf(DeleteCollectionController);
    });
  });

  describe("handle", () => {
    it("Should be an instance of ResponseObject.", async () => {
      collectionUseCaseMock.execute.mockResolvedValue([
        new DeleteCollectionOutputBoundary(
          dbCollectionExample as DBOutputCollectionData,
        ),
      ]);

      const controller = new DeleteCollectionController(collectionUseCaseMock);

      expect(
        controller.handle(httpRequestMockCollection),
      ).resolves.toBeInstanceOf(ResponseObject);
      const response = await controller.handle(httpRequestMockCollection);
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeUndefined();
      expect(collectionUseCaseMock.execute).toHaveBeenCalled();
    });
  });
});
