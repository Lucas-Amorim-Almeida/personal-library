import UserStatusInputBoundary from "@/domain/application/User/UserStatusUpdate/UserStatusUpdateInputBoundary";
import UserStatus from "@/domain/core/UserStatus";

describe("UserStatusUpdateInputBoundary", () => {
  describe("Constructor", () => {
    it("Should be an instance of UserStatusUpdateInputBoundary", () => {
      const inputParams = { id: "id-00001", status: "BANIDO" };

      expect(new UserStatusInputBoundary(inputParams)).toBeInstanceOf(
        UserStatusInputBoundary,
      );
    });

    it("Should throws an error of User status is not valid.", () => {
      const inputParams = { id: "id-00001", status: "invalido" };

      expect(() => new UserStatusInputBoundary(inputParams)).toThrow(
        "User status is not valid.",
      );
    });
  });

  describe("get", () => {
    it("Shuold return an object with id and user status", () => {
      const inputParams = { id: "id-00001", status: "BANIDO" };
      const input = new UserStatusInputBoundary(inputParams);

      expect(input.get()).toEqual({
        id: "id-00001",
        status: UserStatus.BANNED,
      });
    });
  });
});
