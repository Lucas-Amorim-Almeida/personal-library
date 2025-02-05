import UtilsErrors from "@/domain/application/Errors/UtilsErrors/UtilsErrors";
import Utils from "@/domain/application/Utils";
import AccessLevel from "@/domain/core/AccessLevel";

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
      ).toThrow(UtilsErrors);
    });
  });
});
