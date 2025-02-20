import { dbCollectionExample } from "@/__tests__/__mocks__/collectionMock";
import CollectionPresenterSimplified from "@/infra/adapters/presenters/CollectionPresenters/CollectionPresenterSimplified";

describe("CollectionPresenterSimplified", () => {
  describe("output", () => {
    it("Should return an object like dbBookExample", () => {
      const presenter = new CollectionPresenterSimplified();

      expect(presenter.output(dbCollectionExample)).toEqual({
        _id: dbCollectionExample._id,
        title: dbCollectionExample.title,
        visibility: dbCollectionExample.visibility,
      });
    });
  });
});
