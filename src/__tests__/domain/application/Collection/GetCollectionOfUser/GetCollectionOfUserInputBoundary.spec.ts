import GetCollectionOfUserInputBoundary from "@/domain/application/Collection/GetCollectionOfUser/GetCollectionOfUserInputBoundary";
import InvalidFieldError from "@/domain/application/Errors/InvalidFieldError";

describe("GetCollectionOfUserInputBoundary", () => {
  describe("Constructor", () => {
    it("Should be an instance of GetCollectionOfUserInputBoundary", () => {
      expect(
        new GetCollectionOfUserInputBoundary({
          user_id: "id-00001",
        }),
      ).toBeInstanceOf(GetCollectionOfUserInputBoundary);
    });

    it("Should throws an error of user_id is not valid.", () => {
      expect(
        () =>
          new GetCollectionOfUserInputBoundary({
            user_id: "",
          }),
      ).toThrow(InvalidFieldError);
    });
  });

  describe("get", () => {
    it("Should return an object containing user_id.", () => {
      const input = new GetCollectionOfUserInputBoundary({
        user_id: "id-00001",
      });
      expect(input.get()).toEqual({
        user_id: "id-00001",
      });
    });
  });
});
