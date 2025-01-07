import { DBOutputData } from "@/application/@types/applicationTypes";
import RemoveUserOutputBoundary from "@/application/User/RemoveUser/RemoveUserOutputBoundary";

describe("RemoveUserOutputBoundary", () => {
  describe("Constructor", () => {
    it("Should be an instance of RemoveUserOutputBoundary", () => {
      const params: DBOutputData = {
        id: "id-0001",
        status: "A DELETAR",
        username: "john_doe",
        password: "1234",
        access_level: "COMMON",
        created_at: new Date(2020, 2, 22),
        updated_at: new Date(2022, 2, 22),
      };
      expect(new RemoveUserOutputBoundary(params)).toBeInstanceOf(
        RemoveUserOutputBoundary,
      );
    });
  });

  describe("get", () => {
    it("Should return true", () => {
      const params: DBOutputData = {
        id: "id-0001",
        status: "A DELETAR",
        username: "john_doe",
        password: "1234",
        access_level: "COMMON",
        created_at: new Date(2020, 2, 22),
        updated_at: new Date(2022, 2, 22),
      };

      const output = new RemoveUserOutputBoundary(params);

      expect(output.get()).toBe(true);
    });

    it("Should return false", () => {
      const params: DBOutputData = {
        id: "id-0001",
        status: "BANIDO",
        username: "john_doe",
        password: "1234",
        access_level: "COMMON",
        created_at: new Date(2020, 2, 22),
        updated_at: new Date(2022, 2, 22),
      };

      const output = new RemoveUserOutputBoundary(params);

      expect(output.get()).toBe(false);
    });

    it("Should throws an error User status is not valid.", () => {
      const params: DBOutputData = {
        id: "id-0001",
        status: "invalid",
        username: "john_doe",
        password: "1234",
        access_level: "COMMON",
        created_at: new Date(2020, 2, 22),
        updated_at: new Date(2022, 2, 22),
      };

      const output = new RemoveUserOutputBoundary(params);

      expect(() => output.get()).toThrow("User status is not valid.");
    });
  });
});
