import { dbBookExample } from "@/__tests__/__mocks__/bookMock";
import BookPresenter from "@/infra/adapters/presenters/BookPresenters/BookPresenter";

describe("BookPresenter", () => {
  describe("output", () => {
    it("Should return an object like dbBookExample", () => {
      const presenter = new BookPresenter();

      expect(presenter.output(dbBookExample)).toEqual(dbBookExample);
    });
  });
});
