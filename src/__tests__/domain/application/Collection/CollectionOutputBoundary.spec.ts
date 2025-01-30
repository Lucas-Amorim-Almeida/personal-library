import { dbCollectionExample } from "@/__tests__/__mocks__/collectionMock";
import { DBOutputCollectionData } from "@/domain/application/@types/CollectionTypes";
import CollectionOutputBoundary from "@/domain/application/Collection/CollectionOutputBoundary";

describe("CreateCollectionOutputBoundary", () => {
  describe("Constructor", () => {
    it("Should be an instance of CreateCollectionOutputBoundary", () => {
      expect(
        new CollectionOutputBoundary(
          dbCollectionExample as DBOutputCollectionData,
        ),
      ).toBeInstanceOf(CollectionOutputBoundary);
    });
  });

  describe("get", () => {
    const output = new CollectionOutputBoundary(
      dbCollectionExample as DBOutputCollectionData,
    );
    expect(output.get()).toEqual(dbCollectionExample);
  });
});
