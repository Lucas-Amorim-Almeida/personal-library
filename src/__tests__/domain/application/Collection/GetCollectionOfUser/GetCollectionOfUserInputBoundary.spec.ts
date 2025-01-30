import GetCollectionOfUserInputBoundary from "@/domain/application/Collection/GetCollectionOfUser/GetCollectionOfUserInputBoundary";

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
      ).toThrow("Owner is not valid.");
    });
  });

  describe("get", () => {
    it("Should return an object containing user_id.", () => {
      const input = new GetCollectionOfUserInputBoundary({
        user_id: "id-00001",
      });
      expect(input.get()).toEqual({
        owner: "id-00001",
      });
    });
  });
});
