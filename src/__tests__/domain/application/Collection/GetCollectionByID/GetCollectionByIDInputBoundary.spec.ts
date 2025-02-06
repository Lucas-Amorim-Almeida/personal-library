import GetCollectionByIDInputBoundary from "@/domain/application/Collection/GetCollectionByID/GetCollectionByIDInputBoundary";
import InvalidFieldError from "@/domain/application/Errors/InvalidFieldError";

describe("GetCollectionByIDInputBoundary", () => {
  describe("Constructor", () => {
    it("Should be an instance of GetCollectionByIDInputBoundary", () => {
      expect(
        new GetCollectionByIDInputBoundary({ collection_id: "000001" }),
      ).toBeInstanceOf(GetCollectionByIDInputBoundary);
    });

    it("Should throws an error of Collection id is not valid.", () => {
      expect(
        () => new GetCollectionByIDInputBoundary({ collection_id: "" }),
      ).toThrow(InvalidFieldError);
    });
  });

  describe("get", () => {
    it("Should return an object containing collection id.", () => {
      const input = new GetCollectionByIDInputBoundary({
        collection_id: "000001",
      });
      expect(input.get()).toEqual({ collection_id: "000001" });
    });
  });
});
