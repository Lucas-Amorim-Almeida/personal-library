import ChangePasswordOutputBoundary from "@/application/ChangePassword/ChangePasswordOutputBoundary";
import AccessLevel from "@/core/AccessLevel";
import User from "@/core/User";
import UserStatus from "@/core/UserStatus";

type Params = {
  id: string;
  status: string;
  username: string;
  password: string;
  access_level: string;
  created_at?: Date;
  updated_at?: Date;
};

describe("ChangePasswordOutputBoundary", () => {
  describe("Constructor", () => {
    it("Should be an instance of ChangePasswordOutputBoundary", () => {
      const params: Params = {
        id: "id-0001",
        username: "john_doe",
        password: "1234",
        status: "ATIVO",
        access_level: "COMMON",
        created_at: new Date(2020, 2, 22),
        updated_at: new Date(2022, 2, 22),
      };

      expect(new ChangePasswordOutputBoundary(params)).toBeInstanceOf(
        ChangePasswordOutputBoundary,
      );
    });

    it("Should throws an erro of Access level is not valid.", () => {
      const params: Params = {
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
      const params: Params = {
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
    const params: Params = {
      id: "id-0001",
      username: "john_doe",
      password: "1234",
      status: "ATIVO",
      access_level: "COMMON",
      created_at: new Date(2020, 2, 22),
      updated_at: new Date(2022, 2, 22),
    };

    const output = new ChangePasswordOutputBoundary(params);

    expect(output.get()).toBeInstanceOf(User);
    expect(output.get().getId()).toBe(params.id);
    expect(output.get().getStatus()).toBe(UserStatus.ACTIVE);
    expect(output.get().get().access_level).toBe(AccessLevel.COMMON);
  });
});
