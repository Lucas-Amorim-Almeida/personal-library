import { dbCollectionExample } from "@/__tests__/__mocks__/mocks";
import { DBOutputCollectionData } from "@/application/@types/applicationTypes";
import CreateCollectionOutputBoundary from "@/application/Collection/CreteCollection/CreateCollectionOutputBoundary";

describe("CreateCollectionOutputBoundary", () => {
  describe("Constructor", () => {
    it("Should be an instance of CreateCollectionOutputBoundary", () => {
      expect(
        new CreateCollectionOutputBoundary(
          dbCollectionExample as DBOutputCollectionData,
        ),
      ).toBeInstanceOf(CreateCollectionOutputBoundary);
    });
  });

  describe("get", () => {
    const output = new CreateCollectionOutputBoundary(
      dbCollectionExample as DBOutputCollectionData,
    );
    expect(output.get()).toEqual(dbCollectionExample);
  });
});
