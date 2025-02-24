import { dbCollectionExample } from "@/__tests__/__mocks__/collectionMock";
import { repositoryMock } from "@/__tests__/__mocks__/mocks";
import DeleteCollection from "@/domain/application/Collection/DeleteCollection/DeleteCollection";
import EntityNotFoundError from "@/domain/application/Errors/EntityNotFoundError";
import InputBoundary from "@/domain/application/InputBoundary";

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
      repositoryMock.delete.mockResolvedValue(dbCollectionExample);
      repositoryMock.getOne.mockResolvedValue(null);

      const deleteCollection = new DeleteCollection(repositoryMock);

      expect(deleteCollection.execute(inputMock)).resolves.toBeInstanceOf(
        Array,
      );

      const [response] = await deleteCollection.execute(inputMock);
      expect(response.get()).toBe(true);
      expect(repositoryMock.delete).toHaveBeenCalledWith({
        _id: "id-collection00001",
      });
      expect(repositoryMock.getOne).toHaveBeenCalledWith({
        _id: "id-collection00001",
      });
    });

    it("Should fail in delete collection in db, collection not.", async () => {
      repositoryMock.delete.mockResolvedValue(dbCollectionExample);
      repositoryMock.getOne.mockResolvedValue(dbCollectionExample);

      const deleteCollection = new DeleteCollection(repositoryMock);

      expect(deleteCollection.execute(inputMock)).resolves.toBeInstanceOf(
        Array,
      );

      const [response] = await deleteCollection.execute(inputMock);
      expect(response.get()).toBe(false);
      expect(repositoryMock.delete).toHaveBeenCalledWith({
        _id: "id-collection00001",
      });
      expect(repositoryMock.getOne).toHaveBeenCalledWith({
        _id: "id-collection00001",
      });
    });

    it("Should fail in delete collection in db, collection not found.", async () => {
      repositoryMock.delete.mockResolvedValue(null);

      const deleteCollection = new DeleteCollection(repositoryMock);

      try {
        await deleteCollection.execute(inputMock);
      } catch (error) {
        expect(repositoryMock.delete).toHaveBeenCalledWith({
          _id: "id-collection00001",
        });
        expect(error).toEqual(new EntityNotFoundError("Collection"));
      }
    });
  });
});
