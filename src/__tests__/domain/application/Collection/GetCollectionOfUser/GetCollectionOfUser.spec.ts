import { dbCollectionExample } from "@/__tests__/__mocks__/collectionMock";
import { repositoryMock } from "@/__tests__/__mocks__/mocks";
import { DBOutputCollectionData } from "@/domain/application/@types/CollectionTypes";
import CollectionOutputBoundary from "@/domain/application/Collection/CollectionOutputBoundary";
import GetCollectionOfUser from "@/domain/application/Collection/GetCollectionOfUser/GetCollectionOfUser";
import InputBoundary from "@/domain/application/InputBoundary";
import OutputBoundary from "@/domain/application/OutputBoundary";

const inputMock: jest.Mocked<InputBoundary<{ user_id: string }>> = {
  get: jest.fn(() => ({ user_id: "id-00001" })),
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
      repositoryMock.getMany.mockResolvedValue([dbCollectionExample]);

      const collections = new GetCollectionOfUser(repositoryMock);

      expect(collections.execute(inputMock)).resolves.toBeInstanceOf(Array);

      const result: OutputBoundary<DBOutputCollectionData>[] =
        await collections.execute(inputMock);
      result.forEach((item) => {
        expect(item).toBeInstanceOf(CollectionOutputBoundary);
      });

      expect(repositoryMock.getMany).toHaveBeenCalledWith({
        owner: "id-00001",
      });
    });
  });
});
