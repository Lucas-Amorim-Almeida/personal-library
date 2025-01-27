import { dbCollectionExample } from "@/__tests__/__mocks__/collectionMock";
import { repositoryMock } from "@/__tests__/__mocks__/mocks";
import DeleteCollection from "@/application/Collection/DeleteCollection/DeleteCollection";
import InputBoundary from "@/application/InputBoundary";

const inputMock: jest.Mocked<InputBoundary<{ id: string }>> = {
  get: jest.fn(() => ({ id: "id-collection00001" })),
};

describe("DeleteCollection", () => {
  describe("Constructor", () => {
    it("Should be an instance of DeleteCollection", () => {
      expect(new DeleteCollection(repositoryMock)).toBeInstanceOf(
        DeleteCollection,
      );
    });
  });

  describe("execute", () => {
    it("Should return an instance of DeleteCollectionOutputBoundary", async () => {
      repositoryMock.delete.mockResolvedValue(null);
      repositoryMock.getOne.mockResolvedValue(null);

      const deleteCollection = new DeleteCollection(repositoryMock);

      expect(deleteCollection.execute(inputMock)).resolves.toBeInstanceOf(
        Array,
      );

      const [response] = await deleteCollection.execute(inputMock);
      expect(response.get()).toBe(true);
      expect(repositoryMock.delete).toHaveBeenCalledWith({
        id: "id-collection00001",
      });
      expect(repositoryMock.getOne).toHaveBeenCalledWith({
        id: "id-collection00001",
      });
    });

    it("Should fail in delete collection in db.", async () => {
      repositoryMock.delete.mockResolvedValue(null);
      repositoryMock.getOne.mockResolvedValue(dbCollectionExample);

      const deleteCollection = new DeleteCollection(repositoryMock);

      expect(deleteCollection.execute(inputMock)).resolves.toBeInstanceOf(
        Array,
      );

      const [response] = await deleteCollection.execute(inputMock);
      expect(response.get()).toBe(false);
      expect(repositoryMock.delete).toHaveBeenCalledWith({
        id: "id-collection00001",
      });
      expect(repositoryMock.getOne).toHaveBeenCalledWith({
        id: "id-collection00001",
      });
    });
  });
});
