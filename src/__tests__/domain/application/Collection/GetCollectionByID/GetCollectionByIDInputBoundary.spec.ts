import GetCollectionByIDInputBoundary from "@/domain/application/Collection/GetCollectionByID/GetCollectionByIDInputBoundary";
import InvalidFieldError from "@/domain/application/Errors/InvalidFieldError";

describe("GetCollectionByIDInputBoundary", () => {
  describe("Constructor", () => {
    it("Should be an instance of GetCollectionByIDInputBoundary", () => {
      expect(
        new GetCollectionByIDInputBoundary({
          collection_id: "000001",
          access_private: true,
        }),
      ).toBeInstanceOf(GetCollectionByIDInputBoundary);
      expect(
        new GetCollectionByIDInputBoundary({
          collection_id: "000001",
          access_private: false,
        }),
      ).toBeInstanceOf(GetCollectionByIDInputBoundary);
    });

    it("Should throws an error of Collection id is not valid.", () => {
      expect(
        () =>
          new GetCollectionByIDInputBoundary({
            collection_id: "",
            access_private: true,
          }),
      ).toThrow(InvalidFieldError);
      expect(
        () =>
          new GetCollectionByIDInputBoundary({
            collection_id: "",
            access_private: false,
          }),
      ).toThrow(InvalidFieldError);
    });
  });

  describe("get", () => {
    it("Should return an object containing collection id and access_private true.", () => {
      const input = new GetCollectionByIDInputBoundary({
        collection_id: "000001",
        access_private: true,
      });
      expect(input.get()).toEqual({
        collection_id: "000001",
        access_private: true,
      });
    });
    it("Should return an object containing collection id and access_private false.", () => {
      const input = new GetCollectionByIDInputBoundary({
        collection_id: "000001",
        access_private: false,
      });
      expect(input.get()).toEqual({
        collection_id: "000001",
        access_private: false,
      });
    });
  });
});
