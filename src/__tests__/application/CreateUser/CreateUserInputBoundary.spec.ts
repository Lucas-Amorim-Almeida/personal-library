import CreateUserInputBoundary from "@/application/CreateUser/CreateUserInputBoundary";
import AccessLevel from "@/core/AccessLevel";
import Contact from "@/core/Contact";
import PersonalData from "@/core/PersonalData";

describe("CreateUserInputBoundary", () => {
  describe("Constructor", () => {
    it("Should be an instance of CreateUserInputBoundary", () => {
      const params = {
        username: "john_doe",
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

      expect(new CreateUserInputBoundary(params)).toBeInstanceOf(
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
      const params = {
        username: "john_doe",
        password: "12345678",
        access_level: "COMMON",
        address: {
          street: "Rua X",
          number: "s/n",
          city: "São Paulo",
          state: "São Paulo",
          country: "Brasil",
          zip_code: "00000-000",
        },
        contact: {
          email: "jonh_doe@example.com",
          phone: ["+5511911111111", "+5522922222222"],
        },
        personal_data: {
          name: "John Doe",
          cpf: "111.222.333-44",
          birth_date: new Date(2001, 1, 11),
        },
      };

      const input = new CreateUserInputBoundary(params);

      expect(input.get()).toEqual({
        username: params.username,
        password: params.password,
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
