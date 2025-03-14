import {
  dbContactExample,
  dbPersonalDataExample,
} from "@/__tests__/__mocks__/mocks";
import { DBOutputUserData } from "@/domain/application/@types/UserTypes";
import RemoveUserOutputBoundary from "@/domain/application/User/RemoveUser/RemoveUserOutputBoundary";

describe("RemoveUserOutputBoundary", () => {
  describe("Constructor", () => {
    it("Should be an instance of RemoveUserOutputBoundary", () => {
      const params: DBOutputUserData = {
        _id: "id-0001",
        username: "john_doe",
        password: "1234",
        access_level: "COMMON",
        contact: dbContactExample,
        personal_data: dbPersonalDataExample,
        status: "A DELETAR",
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
      const params: DBOutputUserData = {
        _id: "id-0001",
        username: "john_doe",
        password: "1234",
        access_level: "COMMON",
        contact: dbContactExample,
        personal_data: dbPersonalDataExample,
        status: "A DELETAR",
        created_at: new Date(2020, 2, 22),
        updated_at: new Date(2022, 2, 22),
      };

      const output = new RemoveUserOutputBoundary(params);

      expect(output.get()).toBe(true);
    });

    it("Should return false", () => {
      const params: DBOutputUserData = {
        _id: "id-0001",
        username: "john_doe",
        password: "1234",
        access_level: "COMMON",
        contact: dbContactExample,
        personal_data: dbPersonalDataExample,
        status: "BANIDO",
        created_at: new Date(2020, 2, 22),
        updated_at: new Date(2022, 2, 22),
      };

      const output = new RemoveUserOutputBoundary(params);

      expect(output.get()).toBe(false);
    });

    it("Should throws an error User status is not valid.", () => {
      const params: DBOutputUserData = {
        _id: "id-0001",
        username: "john_doe",
        password: "1234",
        access_level: "COMMON",
        contact: dbContactExample,
        personal_data: dbPersonalDataExample,
        status: "invalid",
        created_at: new Date(2020, 2, 22),
        updated_at: new Date(2022, 2, 22),
      };

      const output = new RemoveUserOutputBoundary(params);

      expect(() => output.get()).toThrow("User status is not valid.");
    });
  });
});
