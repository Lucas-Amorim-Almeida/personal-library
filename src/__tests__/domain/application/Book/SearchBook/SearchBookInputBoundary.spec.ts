import SearchBookInputBoundary from "@/domain/application/Book/SearchBook/SearchBookInputBoundary";
import FieldRequiredError from "@/domain/application/Errors/FieldRequiredError";
import InvalidFieldError from "@/domain/application/Errors/InvalidFieldError";

describe("SearchBookInputBoundary", () => {
  describe("Constructor", () => {
    it("Should be an instance of SearchBookInputBoundary ", () => {
      expect(
        new SearchBookInputBoundary({ query: "O Senhor dos Anéis", take: 10 }),
      ).toBeInstanceOf(SearchBookInputBoundary);
    });

    it("Should throws an error of field query is required.", () => {
      expect(
        () => new SearchBookInputBoundary({ query: "", take: 10 }),
      ).toThrow(FieldRequiredError);
    });
    it("Should throws an error of take param is not valid.", () => {
      expect(
        () =>
          new SearchBookInputBoundary({ query: "O Senhor dos Anéis", take: 0 }),
      ).toThrow(InvalidFieldError);
    });
  });

  describe("get", () => {
    it("Shuould return an object with search params", () => {
      const input = new SearchBookInputBoundary({
        query: "O Senhor dos Anéis",
        take: 10,
      });
      expect(input.get()).toEqual({ query: "O Senhor dos Anéis", take: 10 });
    });
  });
});
