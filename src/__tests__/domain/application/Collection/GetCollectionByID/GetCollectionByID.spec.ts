import {
  dbCollectionExample,
  dbCollectionExample2,
} from "@/__tests__/__mocks__/collectionMock";
import { repositoryMock } from "@/__tests__/__mocks__/mocks";
import CollectionOutputBoundary from "@/domain/application/Collection/CollectionOutputBoundary";
import GetCollectionByID from "@/domain/application/Collection/GetCollectionByID/GetCollectionByID";
import EntityNotFoundError from "@/domain/application/Errors/EntityNotFoundError";
import InputBoundary from "@/domain/application/InputBoundary";

const inputMock: jest.Mocked<
  InputBoundary<{ collection_id: string; access_private: boolean }>
> = {
  get: jest.fn(() => ({ collection_id: "000002", access_private: true })),
};

describe("GetCollectionByID", () => {
  describe("Constructor", () => {
    it("Should be an instance of GetCollectionByID", () => {
      expect(new GetCollectionByID(repositoryMock)).toBeInstanceOf(
        GetCollectionByID,
      );
    });
  });

  describe("execute", () => {
    afterEach(() => jest.clearAllMocks());

    it("Should return an instance of CollectionOutputBoundary, if access to private collection is allowed.", async () => {
      repositoryMock.getOne.mockResolvedValue(dbCollectionExample2); //collection acesso publico

      const collection = new GetCollectionByID(repositoryMock);

      expect(collection.execute(inputMock)).resolves.toBeInstanceOf(Array);
      const [catchedCollection] = await collection.execute(inputMock);

      expect(catchedCollection).toBeInstanceOf(CollectionOutputBoundary);
      expect(catchedCollection.get()._id).toBe("000002");
      expect(repositoryMock.getOne).toHaveBeenCalledWith({ _id: "000002" });
    });
    it("Should return an instance of CollectionOutputBoundary, if access to private collection is allowed.", async () => {
      const inputMockAllowed: jest.Mocked<
        InputBoundary<{ collection_id: string; access_private: boolean }>
      > = {
        get: jest.fn(() => ({ collection_id: "000001", access_private: true })),
      };
      repositoryMock.getOne.mockResolvedValue(dbCollectionExample); //collection de acesso privado

      const collection = new GetCollectionByID(repositoryMock);

      expect(collection.execute(inputMockAllowed)).resolves.toBeInstanceOf(
        Array,
      );
      const [catchedCollection] = await collection.execute(inputMockAllowed);

      expect(catchedCollection).toBeInstanceOf(CollectionOutputBoundary);
      expect(catchedCollection.get()._id).toBe("000001");
      expect(repositoryMock.getOne).toHaveBeenCalledWith({ _id: "000001" });
    });

    it("Should return an instance of CollectionOutputBoundary, if access to private collection is denied.", async () => {
      const inputMockPublic: jest.Mocked<
        InputBoundary<{ collection_id: string; access_private: boolean }>
      > = {
        get: jest.fn(() => ({
          collection_id: "000002",
          access_private: false,
        })),
      };
      repositoryMock.getOne.mockResolvedValue(dbCollectionExample2);

      const collection = new GetCollectionByID(repositoryMock);

      expect(collection.execute(inputMockPublic)).resolves.toBeInstanceOf(
        Array,
      );
      const [catchedCollection] = await collection.execute(inputMockPublic);

      expect(catchedCollection).toBeInstanceOf(CollectionOutputBoundary);
      expect(catchedCollection.get()._id).toBe("000002");
      expect(repositoryMock.getOne).toHaveBeenCalledWith({ _id: "000002" });
    });
    it("Should return an instance of CollectionOutputBoundary, if access to private collection is denied.", async () => {
      const inputMockPublic: jest.Mocked<
        InputBoundary<{ collection_id: string; access_private: boolean }>
      > = {
        get: jest.fn(() => ({
          collection_id: "000001",
          access_private: false,
        })),
      };
      repositoryMock.getOne.mockResolvedValue(dbCollectionExample); //dbCollection tem acesso privado

      const collection = new GetCollectionByID(repositoryMock);

      expect(collection.execute(inputMockPublic)).resolves.toBeInstanceOf(
        Array,
      );
      const catchedCollection = await collection.execute(inputMockPublic);

      expect(catchedCollection).toEqual([]);
      expect(repositoryMock.getOne).toHaveBeenCalledWith({ _id: "000001" });
    });

    it("Should throws an error of Collection not found.", async () => {
      repositoryMock.getOne.mockResolvedValue(null);

      const inputMock: jest.Mocked<
        InputBoundary<{ collection_id: string; access_private: boolean }>
      > = {
        get: jest.fn(() => ({ collection_id: "000001", access_private: true })),
      };

      const collection = new GetCollectionByID(repositoryMock);

      try {
        await collection.execute(inputMock);
      } catch (error) {
        expect(repositoryMock.getOne).toHaveBeenCalledWith({ _id: "000001" });
        expect(error).toEqual(new EntityNotFoundError("Collection"));
      }
    });
  });
});
