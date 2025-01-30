import RemoveUserInputBoundary from "@/domain/application/User/RemoveUser/RemoveUserInputBoundary";

describe("RemoveUserInputBoundary", () => {
  describe("Constructor", () => {
    it("Should be an instance of RemoveUserInputBoundary", () => {
      expect(new RemoveUserInputBoundary({ id: "id-00001" })).toBeInstanceOf(
        RemoveUserInputBoundary,
      );
    });
  });
  describe("get", () => {
    it("Should return an object containing id.", () => {
      const input = new RemoveUserInputBoundary({ id: "id-00001" });
      expect(input.get()).toEqual({ id: "id-00001" });
    });
  });
});
