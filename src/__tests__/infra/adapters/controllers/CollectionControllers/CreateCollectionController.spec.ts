import {
  collectionUseCaseMock,
  httpRequestMockCollection,
  presenterMock,
} from "@/__tests__/__mocks__/adapterMock";
import { dbCollectionExample } from "@/__tests__/__mocks__/collectionMock";
import { DBOutputCollectionData } from "@/domain/application/@types/CollectionTypes";
import CollectionOutputBoundary from "@/domain/application/Collection/CollectionOutputBoundary";
import CreateCollectionController from "@/infra/adapters/controllers/CollectionController/CreateCollectionController";
import ResponseObject from "@/infra/adapters/controllers/http/protocols/ResponseObject";

describe("CreateCollectionController", () => {
  describe("Constructor", () => {
    it("Should be an instance of CreateCollectionController.", () => {
      expect(
        new CreateCollectionController(presenterMock, collectionUseCaseMock),
      ).toBeInstanceOf(CreateCollectionController);
    });
  });

  describe("handle", () => {
    it("Should be an instance of ResponseObject.", async () => {
      collectionUseCaseMock.execute.mockResolvedValue([
        new CollectionOutputBoundary(
          dbCollectionExample as DBOutputCollectionData,
        ),
      ]);
      presenterMock.output.mockReturnValue(dbCollectionExample);

      const controller = new CreateCollectionController(
        presenterMock,
        collectionUseCaseMock,
      );

      expect(
        controller.handle(httpRequestMockCollection),
      ).resolves.toBeInstanceOf(ResponseObject);
      const response = await controller.handle(httpRequestMockCollection);
      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual(dbCollectionExample);
      expect(collectionUseCaseMock.execute).toHaveBeenCalled();
      expect(presenterMock.output).toHaveBeenCalled();
    });
  });
});
