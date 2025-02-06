import DeleteBookInputBoundary from "@/domain/application/Book/DeleteBook/DeleteBookInputBoundary";
import InvalidFieldError from "@/domain/application/Errors/InvalidFieldError";

const inputParams = { id: "id-book00001" };

describe("DeleteBookInputBoundary", () => {
  describe("Constructor", () => {
    it("Should be an instance of DeleteBookInputBoundary", () => {
      expect(new DeleteBookInputBoundary(inputParams)).toBeInstanceOf(
        DeleteBookInputBoundary,
      );
    });

    it("Should throws  an error of Id is not valid.", () => {
      expect(() => new DeleteBookInputBoundary({ id: "" })).toThrow(
        InvalidFieldError,
      );
    });
  });

  describe("get", () => {
    it("Should return the input data", () => {
      const input = new DeleteBookInputBoundary(inputParams);
      expect(input.get()).toEqual(inputParams);
    });
  });
});
