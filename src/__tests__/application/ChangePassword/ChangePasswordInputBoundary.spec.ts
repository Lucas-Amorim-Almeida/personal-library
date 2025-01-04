import ChangePasswordInputBoundary from "@/application/ChangePassword/ChangePasswordInputBoundary";

const params = {
  id: "id-0001",
  current_password: "1234",
  new_password: "4321",
};

describe("ChangePasswordInputBoundary", () => {
  describe("Constructor", () => {
    it("Should be an instance of ChangePasswordInputBoundary", () => {
      expect(new ChangePasswordInputBoundary(params)).toBeInstanceOf(
        ChangePasswordInputBoundary,
      );
    });
  });

  describe("get", () => {
    it("Should return an object with id, current password and new password", () => {
      const input = new ChangePasswordInputBoundary(params);
      expect(input.get()).toEqual(params);
    });
  });
});
