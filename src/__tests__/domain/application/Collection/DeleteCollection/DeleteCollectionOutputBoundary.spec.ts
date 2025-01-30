import { dbCollectionExample } from "@/__tests__/__mocks__/collectionMock";
import { DBOutputCollectionData } from "@/domain/application/@types/CollectionTypes";
import DeleteCollectionOutputBoundary from "@/domain/application/Collection/DeleteCollection/DeleteCollectionOutputBoundary";

describe("DeleteCollectionOutputBoundary", () => {
  describe("Constructor", () => {
    it("Should be an instance of DeleteCollectionOutputBoundary", () => {
      expect(
        new DeleteCollectionOutputBoundary(
          dbCollectionExample as DBOutputCollectionData,
        ),
      ).toBeInstanceOf(DeleteCollectionOutputBoundary);
      expect(new DeleteCollectionOutputBoundary(null)).toBeInstanceOf(
        DeleteCollectionOutputBoundary,
      );
    });
  });
  describe("get", () => {
    it("Should return true", () => {
      //se o input for nulo, implica que o dado foi deletado com sucesso
      const output = new DeleteCollectionOutputBoundary(null);
      expect(output.get()).toBe(true);
    });

    it("Should return false", () => {
      //se o input for não-nulo, significa que o dado ainda persiste no banco, portanto não foi deletado
      const output = new DeleteCollectionOutputBoundary(
        dbCollectionExample as DBOutputCollectionData,
      );
      expect(output.get()).toBe(false);
    });
  });
});
