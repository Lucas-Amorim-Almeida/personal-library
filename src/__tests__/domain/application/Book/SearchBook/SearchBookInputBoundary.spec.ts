import SearchBookInputBoundary from "@/domain/application/Book/SearchBook/SearchBookInputBoundary";
import FieldRequiredError from "@/domain/application/Errors/FieldRequiredError";
import InvalidFieldError from "@/domain/application/Errors/InvalidFieldError";

describe("SearchBookInputBoundary", () => {
  describe("Constructor", () => {
    it("Should be an instance of SearchBookInputBoundary ", () => {
      expect(
        new SearchBookInputBoundary({
          title: "O Senhor dos Anéis",
          take: 10,
        }),
      ).toBeInstanceOf(SearchBookInputBoundary);
    });

    it("Should be an instance of SearchBookInputBoundary without take param.", () => {
      expect(
        new SearchBookInputBoundary({ title: "O Senhor dos Anéis" }),
      ).toBeInstanceOf(SearchBookInputBoundary);
    });

    it("Should be an instance of SearchBookInputBoundary with author param.", () => {
      expect(new SearchBookInputBoundary({ author: "Tolkien" })).toBeInstanceOf(
        SearchBookInputBoundary,
      );
    });

    it("Should throws an error of required field.", () => {
      expect(() => new SearchBookInputBoundary({})).toThrow(FieldRequiredError);
    });
    it("Should throws an error of take param is not valid.", () => {
      expect(
        () =>
          new SearchBookInputBoundary({
            title: "O Senhor dos Anéis",
            take: 0,
          }),
      ).toThrow(InvalidFieldError);
    });
  });

  describe("get", () => {
    it("Shuould return an object with search params", () => {
      const input = new SearchBookInputBoundary({
        title: "O Senhor dos Anéis",
        take: 10,
      });
      expect(input.get()).toEqual({
        title: "O Senhor dos Anéis",
        take: 10,
      });
    });

    it("Shuould return an object without take param.", () => {
      const input = new SearchBookInputBoundary({
        title: "O Senhor dos Anéis",
      });
      expect(input.get()).toEqual({ title: "O Senhor dos Anéis" });
    });
  });
});
