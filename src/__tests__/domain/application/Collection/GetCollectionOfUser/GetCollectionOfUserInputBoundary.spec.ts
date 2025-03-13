import GetCollectionOfUserInputBoundary from "@/domain/application/Collection/GetCollectionOfUser/GetCollectionOfUserInputBoundary";
import InvalidFieldError from "@/domain/application/Errors/InvalidFieldError";

describe("GetCollectionOfUserInputBoundary", () => {
  describe("Constructor", () => {
    it("Should be an instance of GetCollectionOfUserInputBoundary", () => {
      expect(
        new GetCollectionOfUserInputBoundary({
          user_id: "id-00001",
          access_private: true,
        }),
      ).toBeInstanceOf(GetCollectionOfUserInputBoundary);
      expect(
        new GetCollectionOfUserInputBoundary({
          user_id: "id-00001",
          access_private: false,
        }),
      ).toBeInstanceOf(GetCollectionOfUserInputBoundary);
    });

    it("Should throws an error of user_id is not valid.", () => {
      expect(
        () =>
          new GetCollectionOfUserInputBoundary({
            user_id: "",
            access_private: true,
          }),
      ).toThrow(InvalidFieldError);
      expect(
        () =>
          new GetCollectionOfUserInputBoundary({
            user_id: "",
            access_private: false,
          }),
      ).toThrow(InvalidFieldError);
    });
  });

  describe("get", () => {
    it("Should return an object containing user_id and access_private true.", () => {
      const input = new GetCollectionOfUserInputBoundary({
        user_id: "id-00001",
        access_private: true,
      });
      expect(input.get()).toEqual({
        user_id: "id-00001",
        access_private: true,
      });
    });
    it("Should return an object containing user_id and access_private true.", () => {
      const input = new GetCollectionOfUserInputBoundary({
        user_id: "id-00001",
        access_private: false,
      });
      expect(input.get()).toEqual({
        user_id: "id-00001",
        access_private: false,
      });
    });
  });
});
