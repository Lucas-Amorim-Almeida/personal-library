import { dbUserExample } from "@/__tests__/__mocks__/mocks";
import CreateUserOutputBoundary from "@/application/User/CreateUser/CreateUserOutputBoundary";
import User from "@/core/User";

describe("CreateUserOutputBoundary", () => {
  describe("Constructor", () => {
    it("Should be an instance of CreateOutputBoundary", () => {
      expect(new CreateUserOutputBoundary(dbUserExample)).toBeInstanceOf(
        CreateUserOutputBoundary,
      );
    });

    it("Should throws an error is user status is not valud", () => {
      expect(
        () =>
          new CreateUserOutputBoundary({
            id: "id-00001",
            username: "jonh_doe",
            password: "1234",
            access_level: "COMMON",
            status: "invalido",
            created_at: new Date(2020, 2, 22),
            updated_at: new Date(2022, 2, 22),
          }),
      ).toThrow("User status is not valid.");
    });
    it("Should throws an error is access level is not valud", () => {
      expect(
        () =>
          new CreateUserOutputBoundary({
            id: "id-00001",
            username: "jonh_doe",
            password: "1234",
            access_level: "invalido",
            status: "ATIVO",
            created_at: new Date(2020, 2, 22),
            updated_at: new Date(2022, 2, 22),
          }),
      ).toThrow("Access level is not valid.");
    });
  });

  describe("get", () => {
    it("Should return an instance of User class", () => {
      const output = new CreateUserOutputBoundary(dbUserExample);
      expect(output.get()).toBeInstanceOf(User);
      expect(output.get().getId()).toBe(dbUserExample.id);
    });
  });
});
