import { inputBookUpdateExample } from "@/__tests__/__mocks__/bookMock";
import UpdateBookInputBoundary from "@/domain/application/Book/UpdateBook/UpdateBookInputBoundary";
import FieldRequiredError from "@/domain/application/Errors/FieldRequiredError";
import InvalidFieldError from "@/domain/application/Errors/InvalidFieldError";
import Utils from "@/domain/application/Utils";
import BookGenre from "@/domain/core/BookGenre";

describe("UpdateBookInputBoundary", () => {
  describe("Constructor", () => {
    it("Should be an instance of UpdateBookInputBoundary", () => {
      expect(
        new UpdateBookInputBoundary(inputBookUpdateExample),
      ).toBeInstanceOf(UpdateBookInputBoundary);
    });

    it("Should throws an error of At least one of the properties is required.", () => {
      expect(() => new UpdateBookInputBoundary({ id: "id-00001" })).toThrow(
        FieldRequiredError,
      );
    });

    it("Should throws an error of Book genre is not valid.", () => {
      expect(
        () =>
          new UpdateBookInputBoundary({ id: "id-00001", genre: ["invalid"] }),
      ).toThrow(InvalidFieldError);
    });
  });

  describe("get", () => {
    it("Should return an object containing some property to update", () => {
      const input = new UpdateBookInputBoundary(inputBookUpdateExample);

      const inputParams = {
        id: "id-00001",
        title: inputBookUpdateExample.title,
        author: inputBookUpdateExample.author,
        edition: inputBookUpdateExample.edition,
        publication_year: inputBookUpdateExample.publication_year,
        publisher: inputBookUpdateExample.publisher,
        publication_location: inputBookUpdateExample.publication_location,
        isbn: inputBookUpdateExample.isbn,
        volume: inputBookUpdateExample.volume,
        genre: inputBookUpdateExample.genre.map((item) =>
          Utils.define(BookGenre, item, "Book genre"),
        ),
      };
      expect(input.get()).toMatchObject(inputParams);
    });
  });
});
