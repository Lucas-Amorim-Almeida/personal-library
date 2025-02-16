import { dbBookExample } from "@/__tests__/__mocks__/bookMock";
import SimpleInfoBookPresenter from "@/infra/adapters/presenters/BookPresenters/SimpleInfoBookPresenter";

describe("SimpleInfoBookPresenter", () => {
  describe("output", () => {
    it("Should return an object like dbBookExample", () => {
      const presenter = new SimpleInfoBookPresenter();

      expect(presenter.output(dbBookExample)).toEqual({
        _id: dbBookExample._id,
        title: dbBookExample.title,
        author: dbBookExample.author,
        genre: dbBookExample.genre,
        publication_year: dbBookExample.publication_year,
      });
    });
  });
});
