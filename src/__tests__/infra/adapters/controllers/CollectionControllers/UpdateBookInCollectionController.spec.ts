import { dbCollectionExample } from "@/__tests__/__mocks__/collectionMock";
import { repositoryMock } from "@/__tests__/__mocks__/mocks";
import {
  CollectionInput,
  DBOutputCollectionData,
} from "@/domain/application/@types/CollectionTypes";
import CollectionOutputBoundary from "@/domain/application/Collection/CollectionOutputBoundary";
import UseCase from "@/domain/application/UseCase";
import UpdateBookInCollectionController from "@/infra/adapters/controllers/CollectionController/UpdateBookInCollectionController";
import ResponseObject from "@/infra/adapters/controllers/http/protocols/ResponseObject";
import HTTPRequest from "@/infra/interfaces/HTTPRequest";

const collectionUseCaseMock: jest.Mocked<
  UseCase<CollectionInput, DBOutputCollectionData>
> = {
  repository: repositoryMock,
  execute: jest.fn(),
};
const httpRequestMockCollection: jest.Mocked<HTTPRequest> = {
  params: { id: "id-00001" },
  body: {
    books_collection: [
      {
        book_id: "id-book00001",
        operation: "insert",
      },
      {
        book_id: "id-book00002",
        operation: "remove",
      },
      {
        book_id: "id-book00003",
        operation: "update",
        status: "LEITURA COMPLETA",
      },
    ],
  },
};

describe("UpdateBookInCollectionController", () => {
  describe("Constructor", () => {
    it("Should be an instance of UpdateBookInCollectionController.", () => {
      expect(
        new UpdateBookInCollectionController(collectionUseCaseMock),
      ).toBeInstanceOf(UpdateBookInCollectionController);
    });
  });

  describe("handle", () => {
    it("Should be an instance of ResponseObject.", async () => {
      collectionUseCaseMock.execute.mockResolvedValue([
        new CollectionOutputBoundary(
          dbCollectionExample as DBOutputCollectionData,
        ),
      ]);

      const controller = new UpdateBookInCollectionController(
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
