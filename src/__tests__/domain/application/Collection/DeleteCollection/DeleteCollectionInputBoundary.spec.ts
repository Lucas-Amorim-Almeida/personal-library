import DeleteCollectionInputBoundary from "@/domain/application/Collection/DeleteCollection/DeleteCollectionInputBoundary";
import InvalidFieldError from "@/domain/application/Errors/InvalidFieldError";

const inputParams = {
  id: "id-collection00001",
};

describe("DeleteCollectionInputBoundary", () => {
  describe("Constructor", () => {
    it("Should be an instance of DeleteCollectionInputBoundary", () => {
      expect(new DeleteCollectionInputBoundary(inputParams)).toBeInstanceOf(
        DeleteCollectionInputBoundary,
      );
    });
    it("Should throws an error of Id is not vaild", () => {
      expect(() => new DeleteCollectionInputBoundary({ id: "" })).toThrow(
        InvalidFieldError,
      );
    });
  });

  describe("get", () => {
    it("Should return an object with id propriety", () => {
      const input = new DeleteCollectionInputBoundary(inputParams);
      expect(input.get()).toEqual(inputParams);
    });
  });
});
