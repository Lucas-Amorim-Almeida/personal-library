import { dbUserExample } from "@/__tests__/__mocks__/mocks";
import UserOutputBoundary from "@/domain/application/User/UserOutputBoundary";

describe("UserOutputBoundary", () => {
  describe("Constructor", () => {
    it("Should be an instance of UserOutputBoundary", () => {
      expect(new UserOutputBoundary(dbUserExample)).toBeInstanceOf(
        UserOutputBoundary,
      );
    });
  });

  describe("get", () => {
    it("Should return a DBOutputUserData object.", () => {
      const output = new UserOutputBoundary(dbUserExample);
      expect(output.get()).toEqual(dbUserExample);
    });
  });
});
