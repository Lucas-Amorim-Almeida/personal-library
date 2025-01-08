import { dbUserExample } from "@/__tests__/__mocks__/mocks";
import { DBOutputUserData } from "@/application/@types/applicationTypes";
import LoginOutputBoundary from "@/application/User/Login/LoginOutputBoundary";
import AccessLevel from "@/core/AccessLevel";
import User from "@/core/User";
import UserStatus from "@/core/UserStatus";

describe("LoginOutputBoundary", () => {
  describe("Constructor", () => {
    it("Should be an instance of LoginOutputBoundary", () => {
      expect(new LoginOutputBoundary(dbUserExample)).toBeInstanceOf(
        LoginOutputBoundary,
      );
    });

    it("Should throws an erro of Access level is not valid.", () => {
      const params: DBOutputUserData = {
        id: "id-00001",
        status: "ATIVO",
        access_level: "invalid",
        username: "jonh_doe",
        password: "1234",
        created_at: new Date(2020, 2, 22),
        updated_at: new Date(2022, 2, 22),
      };

      expect(() => new LoginOutputBoundary(params)).toThrow(
        "Access level is not valid.",
      );
    });
    it("Should throws an erro of User status is not valid.", () => {
      const params: DBOutputUserData = {
        id: "id-00001",
        status: "Invalid",
        access_level: "COMMON",
        username: "jonh_doe",
        password: "1234",
        created_at: new Date(2020, 2, 22),
        updated_at: new Date(2022, 2, 22),
      };

      expect(() => new LoginOutputBoundary(params)).toThrow(
        "User status is not valid.",
      );
    });
  });

  describe("get", () => {
    describe("Should return an instance of User", () => {
      const output = new LoginOutputBoundary(dbUserExample);

      expect(output.get()).toBeInstanceOf(User);
      expect(output.get().getId()).toBe(dbUserExample.id);
      expect(output.get().getStatus()).toBe(UserStatus.ACTIVE);
      expect(output.get().get().access_level).toBe(AccessLevel.COMMON);
    });
  });
});
