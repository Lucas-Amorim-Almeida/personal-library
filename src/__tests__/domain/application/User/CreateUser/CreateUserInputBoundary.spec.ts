import { userInputExample } from "@/__tests__/__mocks__/mocks";
import CreateUserInputBoundary from "@/domain/application/User/CreateUser/CreateUserInputBoundary";
import AccessLevel from "@/domain/core/AccessLevel";
import Contact from "@/domain/core/Contact";
import PersonalData from "@/domain/core/PersonalData";

describe("CreateUserInputBoundary", () => {
  describe("Constructor", () => {
    it("Should be an instance of CreateUserInputBoundary", () => {
      expect(new CreateUserInputBoundary(userInputExample)).toBeInstanceOf(
        CreateUserInputBoundary,
      );
    });

    it("Should throws an Error", () => {
      const params = {
        username: "",
        password: "12345678",
        access_level: "COMMON",
        contact: {
          email: "jonh_doe@example.com",
          phone: ["+5511911111111", "+5522922222222"],
        },
        personal_data: {
          name: "John Doe",
          birth_date: new Date(2001, 1, 11),
        },
      };

      expect(() => new CreateUserInputBoundary(params)).toThrow(
        "Required fields are missing.",
      );
    });

    it("Should return an Error", () => {
      const params = {
        username: "john_doe",
        password: "",
        access_level: "COMMON",

        contact: {
          email: "jonh_doe@example.com",
          phone: ["+5511911111111", "+5522922222222"],
        },
        personal_data: {
          name: "John Doe",
          birth_date: new Date(2001, 1, 11),
        },
      };

      expect(() => new CreateUserInputBoundary(params)).toThrow(
        "Required fields are missing.",
      );
    });

    it("Should return an Error", () => {
      const params = {
        username: "john_doe",
        password: "12345678",
        access_level: "",
        contact: {
          email: "jonh_doe@example.com",
          phone: ["+5511911111111", "+5522922222222"],
        },
        personal_data: {
          name: "John Doe",
          birth_date: new Date(2001, 1, 11),
        },
      };

      expect(() => new CreateUserInputBoundary(params)).toThrow(
        "Required fields are missing.",
      );
    });
  });

  describe("get", () => {
    it("Should return an object as UserParamsType", () => {
      const input = new CreateUserInputBoundary(userInputExample);

      expect(input.get()).toEqual({
        username: userInputExample.username,
        password: userInputExample.password,
        access_level: AccessLevel.COMMON,
        contact: expect.any(Contact),
        personal_data: expect.any(PersonalData),
      });
    });

    it("Should return an object as UserParamsType", () => {
      const params = {
        username: "john_doe",
        password: "12345678",
        access_level: "invalid",
        contact: {
          email: "jonh_doe@example.com",
          phone: ["+5511911111111", "+5522922222222"],
        },
        personal_data: {
          name: "John Doe",
          birth_date: new Date(2001, 1, 11),
        },
      };

      const input = new CreateUserInputBoundary(params);

      expect(() => input.get()).toThrow("Access level is not valid.");
    });
  });
});
