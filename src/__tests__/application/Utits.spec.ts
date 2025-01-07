import Utils from "@/application/Utils";
import AccessLevel from "@/core/AccessLevel";

describe("Utils", () => {
  describe("define", () => {
    it("Should return an object listed in enum like AccessLevel", () => {
      expect(Utils.define(AccessLevel, "GUEST", "Access level")).toEqual(
        AccessLevel.GUEST,
      );
    });

    it("Should throws an error like AccessLevel", () => {
      expect(() =>
        Utils.define(AccessLevel, "invalid", "Access level"),
      ).toThrow("Access level is not valid.");
    });
  });
});
