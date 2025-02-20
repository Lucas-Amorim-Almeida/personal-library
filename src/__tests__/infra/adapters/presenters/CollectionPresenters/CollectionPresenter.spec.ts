import { dbCollectionExample } from "@/__tests__/__mocks__/collectionMock";
import CollectionPresenter from "@/infra/adapters/presenters/CollectionPresenters/CollectionPresenter";

describe("CollectionPresenter", () => {
  describe("output", () => {
    it("Should return an object like dbBookExample", () => {
      const presenter = new CollectionPresenter();

      expect(presenter.output(dbCollectionExample)).toEqual(
        dbCollectionExample,
      );
    });
  });
});
