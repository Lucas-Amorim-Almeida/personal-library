import {
  dbCollectionExample,
  dbCollectionExample2,
} from "@/__tests__/__mocks__/collectionMock";
import { repositoryMock } from "@/__tests__/__mocks__/mocks";
import { DBOutputCollectionData } from "@/domain/application/@types/CollectionTypes";
import CollectionOutputBoundary from "@/domain/application/Collection/CollectionOutputBoundary";
import GetCollectionOfUser from "@/domain/application/Collection/GetCollectionOfUser/GetCollectionOfUser";
import InputBoundary from "@/domain/application/InputBoundary";
import OutputBoundary from "@/domain/application/OutputBoundary";

describe("GetCollectionOfUser", () => {
  describe("Constructor", () => {
    it("Should be an instance of GetCollectionOfUser", () => {
      expect(new GetCollectionOfUser(repositoryMock)).toBeInstanceOf(
        GetCollectionOfUser,
      );
    });
  });

  describe("execute", () => {
    it("Should return all collection as instance of CollectionOutputBoundary", async () => {
      const inputMock: jest.Mocked<
        InputBoundary<{ user_id: string; access_private: boolean }>
      > = {
        get: jest.fn(() => ({ user_id: "id-00001", access_private: true })),
      };
      repositoryMock.getMany.mockResolvedValue([
        dbCollectionExample,
        dbCollectionExample2,
      ]);

      const collections = new GetCollectionOfUser(repositoryMock);

      expect(collections.execute(inputMock)).resolves.toBeInstanceOf(Array);

      const result: OutputBoundary<DBOutputCollectionData>[] =
        await collections.execute(inputMock);
      result.forEach((item) => {
        expect(item).toBeInstanceOf(CollectionOutputBoundary);
      });
      expect(result).toHaveLength(2);

      expect(repositoryMock.getMany).toHaveBeenCalledWith({
        owner: "id-00001",
      });
    });

    it("Should return only private collection as instance of CollectionOutputBoundary", async () => {
      const inputMock: jest.Mocked<
        InputBoundary<{ user_id: string; access_private: boolean }>
      > = {
        get: jest.fn(() => ({ user_id: "id-00001", access_private: false })),
      };
      repositoryMock.getMany.mockResolvedValue([
        dbCollectionExample,
        dbCollectionExample2,
      ]);

      const collections = new GetCollectionOfUser(repositoryMock);

      expect(collections.execute(inputMock)).resolves.toBeInstanceOf(Array);

      const result: OutputBoundary<DBOutputCollectionData>[] =
        await collections.execute(inputMock);
      result.forEach((item) => {
        expect(item).toBeInstanceOf(CollectionOutputBoundary);
      });
      expect(result).toHaveLength(1);

      expect(repositoryMock.getMany).toHaveBeenCalledWith({
        owner: "id-00001",
      });
    });
  });
});
