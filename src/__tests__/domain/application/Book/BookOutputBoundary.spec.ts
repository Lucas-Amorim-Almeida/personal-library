import { dbBookExample } from "@/__tests__/__mocks__/bookMock";
import { DBOutputBookData } from "@/domain/application/@types/BookTypes";

import BookOutputBoundary from "@/domain/application/Book/BookOutputBoundary";

describe("CreateBookOutputBoundary", () => {
  describe("Constructor", () => {
    it("Should be an instance of CreateBookOutputBoundary", () => {
      expect(
        new BookOutputBoundary(dbBookExample as DBOutputBookData),
      ).toBeInstanceOf(BookOutputBoundary);
    });
  });

  describe("get", () => {
    it("Should return an object containing an user_id and a Book class instance", () => {
      const input = new BookOutputBoundary(dbBookExample as DBOutputBookData);

      expect(input.get()).toEqual(dbBookExample);
    });
  });
});
