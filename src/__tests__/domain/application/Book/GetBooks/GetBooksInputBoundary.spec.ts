import GetBooksInputBoundary from "@/domain/application/Book/GetBooks/GetBooksInputBoundary";
import InvalidFieldError from "@/domain/application/Errors/InvalidFieldError";

describe("GetBooksInputBoundary", () => {
  describe("Constructor", () => {
    it("Should be an instance of SearchBookInputBoundary ", () => {
      expect(new GetBooksInputBoundary({ take: 10 })).toBeInstanceOf(
        GetBooksInputBoundary,
      );
    });

    it("Should be an instance of GetBooksInputBoundary ", () => {
      expect(new GetBooksInputBoundary({})).toBeInstanceOf(
        GetBooksInputBoundary,
      );
    });

    it("Should throws an error of take param is not valid.", () => {
      expect(() => new GetBooksInputBoundary({ take: 0 })).toThrow(
        InvalidFieldError,
      );
    });
  });

  describe("get", () => {
    it("Shuould return an object with take param.", () => {
      const input = new GetBooksInputBoundary({
        take: 10,
      });
      expect(input.get()).toEqual({ take: 10 });
    });
    it("Shuould return an empty object.", () => {
      const input = new GetBooksInputBoundary({});
      expect(input.get()).toEqual({});
    });
  });
});
