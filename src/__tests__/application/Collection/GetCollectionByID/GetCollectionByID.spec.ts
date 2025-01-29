import { dbCollectionExample2 } from "@/__tests__/__mocks__/collectionMock";
import { repositoryMock } from "@/__tests__/__mocks__/mocks";
import CollectionOutputBoundary from "@/application/Collection/CollectionOutputBoundary";
import GetCollectionByID from "@/application/Collection/GetCollectionByID/GetCollectionByID";
import InputBoundary from "@/application/InputBoundary";

const inputMock: jest.Mocked<InputBoundary<{ collection_id: string }>> = {
  get: jest.fn(() => ({ collection_id: "000002" })),
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

    it("Should return an instance of CollectionOutputBoundary.", async () => {
      repositoryMock.getOne.mockResolvedValue(dbCollectionExample2);

      const collection = new GetCollectionByID(repositoryMock);

      expect(collection.execute(inputMock)).resolves.toBeInstanceOf(Array);
      const [catchedCollection] = await collection.execute(inputMock);

      expect(catchedCollection).toBeInstanceOf(CollectionOutputBoundary);
      expect(catchedCollection.get().id).toBe("000002");
      expect(repositoryMock.getOne).toHaveBeenCalledWith({ id: "000002" });
    });

    it("Should throws an error of Collection not found.", async () => {
      repositoryMock.getOne.mockResolvedValue(null);

      const inputMock: jest.Mocked<InputBoundary<{ collection_id: string }>> = {
        get: jest.fn(() => ({ collection_id: "000001" })),
      };

      const collection = new GetCollectionByID(repositoryMock);

      try {
        await collection.execute(inputMock);
      } catch (error) {
        expect(repositoryMock.getOne).toHaveBeenCalledWith({ id: "000001" });
        expect(error).toEqual(new Error("Collection not found."));
      }
    });
  });
});
