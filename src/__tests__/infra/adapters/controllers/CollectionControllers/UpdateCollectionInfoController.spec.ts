import { dbCollectionExample } from "@/__tests__/__mocks__/collectionMock";
import { repositoryMock } from "@/__tests__/__mocks__/mocks";
import {
  DBOutputCollectionData,
  InputCollectionInfoUpdate,
} from "@/domain/application/@types/CollectionTypes";
import CollectionOutputBoundary from "@/domain/application/Collection/CollectionOutputBoundary";
import UseCase from "@/domain/application/UseCase";
import UpdateCollectionInfoController from "@/infra/adapters/controllers/CollectionController/UpdateCollectionInfoController";
import ResponseObject from "@/infra/adapters/controllers/http/protocols/ResponseObject";
import HTTPRequest from "@/infra/interfaces/HTTPRequest";

const collectionUseCaseMock: jest.Mocked<
  UseCase<InputCollectionInfoUpdate, DBOutputCollectionData>
> = {
  repository: repositoryMock,
  execute: jest.fn(),
};
const httpRequestMockCollection: jest.Mocked<HTTPRequest> = {
  params: { id: "id-00001" },
  body: {
    title: "Novo título.",
  },
};

describe("UpdateCollectionInfoController", () => {
  describe("Constructor", () => {
    it("Should be an instance of UpdateCollectionInfoController.", () => {
      expect(
        new UpdateCollectionInfoController(collectionUseCaseMock),
      ).toBeInstanceOf(UpdateCollectionInfoController);
    });
  });

  describe("handle", () => {
    it("Should be an instance of ResponseObject.", async () => {
      collectionUseCaseMock.execute.mockResolvedValue([
        new CollectionOutputBoundary(
          dbCollectionExample as DBOutputCollectionData,
        ),
      ]);

      const controller = new UpdateCollectionInfoController(
        collectionUseCaseMock,
      );

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
