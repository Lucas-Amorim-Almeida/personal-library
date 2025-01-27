import { dbCollectionExample } from "@/__tests__/__mocks__/collectionMock";
import { repositoryMock } from "@/__tests__/__mocks__/mocks";
import { DBOutputCollectionData } from "@/application/@types/applicationTypes";
import CollectionOutputBoundary from "@/application/Collection/CollectionOutputBoundary";
import GetCollectionOfUser from "@/application/Collection/GetCollectionOfUser/GetCollectionOfUser";
import InputBoundary from "@/application/InputBoundary";
import OutputBoundary from "@/application/OutputBoundary";

const inputMock: jest.Mocked<InputBoundary<{ owner: string }>> = {
  get: jest.fn(() => ({ owner: "id-00001" })),
};

describe("GetCollectionOfUser", () => {
  describe("Constructor", () => {
    it("Should be an instance of GetCollectionOfUser", () => {
      expect(new GetCollectionOfUser(repositoryMock)).toBeInstanceOf(
        GetCollectionOfUser,
      );
    });
  });

  describe("execute", () => {
    it("Should return an instance of CollectionOutputBoundary", async () => {
      repositoryMock.getAll.mockResolvedValue([dbCollectionExample]);

      const collections = new GetCollectionOfUser(repositoryMock);

      expect(collections.execute(inputMock)).resolves.toBeInstanceOf(Array);

      const result: OutputBoundary<DBOutputCollectionData>[] =
        await collections.execute(inputMock);
      result.forEach((item) => {
        expect(item).toBeInstanceOf(CollectionOutputBoundary);
      });

      expect(repositoryMock.getAll).toHaveBeenCalledWith({
        owner: "id-00001",
      });
    });
  });
});
