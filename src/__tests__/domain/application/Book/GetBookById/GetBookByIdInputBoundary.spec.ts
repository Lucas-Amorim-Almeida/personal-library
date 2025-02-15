import GetBookByIdInputBoundary from "@/domain/application/Book/GetBookByID/GetBookByIdInputBoundary";
import FieldRequiredError from "@/domain/application/Errors/FieldRequiredError";

describe("GetBookByIdInputBoundary", () => {
  describe("Constructor", () => {
    it("Should be an instance of SearchBookInputBoundary ", () => {
      expect(new GetBookByIdInputBoundary({ id: "id-00001" })).toBeInstanceOf(
        GetBookByIdInputBoundary,
      );
    });

    it("Should throws an error of field Id is required.", () => {
      expect(() => new GetBookByIdInputBoundary({ id: "" })).toThrow(
        FieldRequiredError,
      );
    });
  });

  describe("get", () => {
    it("Shuould return an object with id param.", () => {
      const input = new GetBookByIdInputBoundary({ id: "id-00001" });
      expect(input.get()).toEqual({ id: "id-00001" });
    });
  });
});
