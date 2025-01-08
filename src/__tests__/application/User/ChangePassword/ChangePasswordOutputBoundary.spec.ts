import { dbUserExample } from "@/__tests__/__mocks__/mocks";
import { DBOutputUserData } from "@/application/@types/applicationTypes";
import ChangePasswordOutputBoundary from "@/application/User/ChangePassword/ChangePasswordOutputBoundary";
import AccessLevel from "@/core/AccessLevel";
import User from "@/core/User";
import UserStatus from "@/core/UserStatus";

describe("ChangePasswordOutputBoundary", () => {
  describe("Constructor", () => {
    it("Should be an instance of ChangePasswordOutputBoundary", () => {
      expect(new ChangePasswordOutputBoundary(dbUserExample)).toBeInstanceOf(
        ChangePasswordOutputBoundary,
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

      expect(() => new ChangePasswordOutputBoundary(params)).toThrow(
        "Access level is not valid.",
      );
    });

    it("Should throws an error of User status is not valid.", () => {
      const params: DBOutputUserData = {
        id: "id-0001",
        username: "john_doe",
        password: "1234",
        status: "invalid",
        access_level: "COMMON",
        created_at: new Date(2020, 2, 22),
        updated_at: new Date(2022, 2, 22),
      };

      expect(() => new ChangePasswordOutputBoundary(params)).toThrow(
        "User status is not valid.",
      );
    });
  });

  describe("get", () => {
    const output = new ChangePasswordOutputBoundary(dbUserExample);

    expect(output.get()).toBeInstanceOf(User);
    expect(output.get().getId()).toBe(dbUserExample.id);
    expect(output.get().getStatus()).toBe(UserStatus.ACTIVE);
    expect(output.get().get().access_level).toBe(AccessLevel.COMMON);
  });
});
