import UserStatusUpdateOutputBoundary from "@/application/UserStatusUpdate/UserStatusUpdateOutputBoundary";
import User from "@/core/User";
import UserStatus from "@/core/UserStatus";

describe("UserStatusUpdateOutputBoundary", () => {
  describe("Constructor", () => {
    it("Should be an instance of UserStatusUpdateOutputBoundary", () => {
      const params = {
        id: "id-0001",
        username: "john_doe",
        password: "1234",
        status: "BANIDO",
        access_level: "COMMON",
        created_at: new Date(2020, 2, 22),
        updated_at: new Date(2022, 2, 22),
      };

      expect(new UserStatusUpdateOutputBoundary(params)).toBeInstanceOf(
        UserStatusUpdateOutputBoundary,
      );
    });

    it("Should throws an error of Access level is not valid.", () => {
      const params = {
        id: "id-0001",
        username: "john_doe",
        password: "1234",
        status: "BANIDO",
        access_level: "invalid",
        created_at: new Date(2020, 2, 22),
        updated_at: new Date(2022, 2, 22),
      };

      expect(() => new UserStatusUpdateOutputBoundary(params)).toThrow(
        "Access level is not valid.",
      );
    });

    it("Should throws an error of User status is not valid.", () => {
      const params = {
        id: "id-0001",
        username: "john_doe",
        password: "1234",
        status: "invalid",
        access_level: "COMMON",
        created_at: new Date(2020, 2, 22),
        updated_at: new Date(2022, 2, 22),
      };

      expect(() => new UserStatusUpdateOutputBoundary(params)).toThrow(
        "User status is not valid.",
      );
    });
  });

  describe("get", () => {
    describe("Should return an instance of User", () => {
      const params = {
        id: "id-0001",
        username: "john_doe",
        password: "1234",
        status: "BANIDO",
        access_level: "COMMON",
        created_at: new Date(2020, 2, 22),
        updated_at: new Date(2022, 2, 22),
      };
      const output = new UserStatusUpdateOutputBoundary(params);

      expect(output.get()).toBeInstanceOf(User);
      expect(output.get().getStatus()).toEqual(UserStatus.BANNED);
    });
  });
});
