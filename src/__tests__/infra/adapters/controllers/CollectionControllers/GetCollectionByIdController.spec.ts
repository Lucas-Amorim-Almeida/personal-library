import { presenterMock } from "@/__tests__/__mocks__/adapterMock";
import { dbCollectionExample } from "@/__tests__/__mocks__/collectionMock";
import { repositoryMock } from "@/__tests__/__mocks__/mocks";
import { DBOutputCollectionData } from "@/domain/application/@types/CollectionTypes";
import CollectionOutputBoundary from "@/domain/application/Collection/CollectionOutputBoundary";
import UseCase from "@/domain/application/UseCase";
import GetCollectionByIdController from "@/infra/adapters/controllers/CollectionController/GetCollectionByIdController";
import ResponseObject from "@/infra/adapters/controllers/http/protocols/ResponseObject";
import HTTPRequest from "@/infra/interfaces/HTTPRequest";

const collectionUseCaseMock: jest.Mocked<
  UseCase<
    { collection_id: string; access_private: boolean },
    DBOutputCollectionData
  >
> = {
  repository: repositoryMock,
  execute: jest.fn(),
};
const httpRequestMockCollection: jest.Mocked<HTTPRequest> = {
  params: { id: "000001" },
  body: { access_private: true },
};

describe("GetCollectionByIdController", () => {
  describe("Constructor", () => {
    it("Should be an instance of GetCollectionByIdController.", () => {
      expect(
        new GetCollectionByIdController(presenterMock, collectionUseCaseMock),
      ).toBeInstanceOf(GetCollectionByIdController);
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

      const controller = new GetCollectionByIdController(
        presenterMock,
        collectionUseCaseMock,
      );

      expect(
        controller.handle(httpRequestMockCollection),
      ).resolves.toBeInstanceOf(ResponseObject);
      const response = await controller.handle(httpRequestMockCollection);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(dbCollectionExample);
      expect(collectionUseCaseMock.execute).toHaveBeenCalled();
      expect(presenterMock.output).toHaveBeenCalled();
    });

    it("Should be an instance of ResponseObject, if private collection access is denied.", async () => {
      const httpRequestMockCollection: jest.Mocked<HTTPRequest> = {
        params: { id: "000002" },
        body: { access_private: false },
      };
      collectionUseCaseMock.execute.mockResolvedValue([
        new CollectionOutputBoundary(
          dbCollectionExample as DBOutputCollectionData,
        ),
      ]);
      presenterMock.output.mockReturnValue([]);

      const controller = new GetCollectionByIdController(
        presenterMock,
        collectionUseCaseMock,
      );

      expect(
        controller.handle(httpRequestMockCollection),
      ).resolves.toBeInstanceOf(ResponseObject);
      const response = await controller.handle(httpRequestMockCollection);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual([]);
      expect(collectionUseCaseMock.execute).toHaveBeenCalled();
      expect(presenterMock.output).toHaveBeenCalled();
    });
  });
});
