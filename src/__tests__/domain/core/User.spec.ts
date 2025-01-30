import {
  ContactParamsType,
  PersonalDataParamsType,
  UserParamsType,
} from "@/domain/core/@types/types";
import AccessLevel from "@/domain/core/AccessLevel";
import Contact from "@/domain/core/Contact";
import PersonalData from "@/domain/core/PersonalData";
import User from "@/domain/core/User";
import UserStatus from "@/domain/core/UserStatus";
import Email from "@/domain/core/valueObjects/Email";
import Phone from "@/domain/core/valueObjects/Phone";

describe("User", () => {
  const contactData: ContactParamsType = {
    email: new Email("jonh_doe@example.com"),
    phone: [new Phone("+5511911111111"), new Phone("+5522922222222")],
  };
  const personalDataInfo: PersonalDataParamsType = {
    name: "John Doe",
    birth_date: new Date(2001, 1, 11),
  };

  let contact: Contact;
  let personalData: PersonalData;

  beforeEach(() => {
    contact = new Contact(contactData);
    personalData = new PersonalData(personalDataInfo);
  });

  describe("constructor", () => {
    it("should be an instance of User when object params is complete", () => {
      const params: UserParamsType = {
        username: "jonh_doe",
        password: "1234",
        access_level: AccessLevel.ADMINISTRATOR,
        personal_data: personalData,
        contact: contact,
      };
      const user = new User(params);

      expect(user).toBeInstanceOf(User);
    });

    it("should be an instance of User without all optional properties of params", () => {
      const params: UserParamsType = {
        username: "jonh_doe",
        password: "1234",
        access_level: AccessLevel.COMMON,
      };
      const user = new User(params);

      expect(user).toBeInstanceOf(User);
    });

    it("should be an instance of User with timestamps", () => {
      const params: UserParamsType = {
        username: "jonh_doe",
        password: "1234",
        access_level: AccessLevel.COMMON,
        created_at: new Date(2020, 2, 20),
        updated_at: new Date(2022, 2, 22),
      };
      const user = new User(params);

      expect(user).toBeInstanceOf(User);
    });
  });

  describe("getId (initialization)", () => {
    const params: UserParamsType = {
      username: "jonh_doe",
      password: "1234",
      access_level: AccessLevel.COMMON,
    };
    let user: User;

    beforeEach(() => {
      user = new User(params);
    });

    it("Should be undefined", () => {
      expect(user.getId()).toBeUndefined();
    });
  });

  describe("setId", () => {
    const params: UserParamsType = {
      username: "jonh_doe",
      password: "1234",
      access_level: AccessLevel.COMMON,
    };
    let user: User;

    beforeEach(() => {
      user = new User(params);
    });

    it("Should change id", () => {
      const newId = "id-00001";
      expect(user.getId()).toBeUndefined();
      user.setId(newId);
      expect(user.getId()).toEqual(newId);
    });
  });

  describe("get", () => {
    it("Should return an object", () => {
      const params: UserParamsType = {
        username: "jonh_doe",
        password: "1234",
        access_level: AccessLevel.COMMON,
      };
      const user = new User(params);
      expect(user.get()).toEqual({
        username: params.username,
        password: expect.any(String),
        access_level: AccessLevel.COMMON,
        status: UserStatus.ACTIVE,
      });
    });
    it("Should return an object when params object is complete", () => {
      const params: UserParamsType = {
        username: "jonh_doe",
        password: "1234",
        access_level: AccessLevel.COMMON,
        contact: contact,
        personal_data: personalData,
        created_at: new Date(2020, 2, 22),
        updated_at: new Date(2022, 2, 22),
      };
      const user = new User(params);
      expect(user.get()).toEqual({
        username: params.username,
        password: expect.any(String),
        access_level: AccessLevel.COMMON,
        contact: params.contact,
        personal_data: params.personal_data,
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
        status: UserStatus.ACTIVE,
      });
    });
  });

  describe("setPassword", () => {
    const params: UserParamsType = {
      username: "jonh_doe",
      password: "1234",
      access_level: AccessLevel.COMMON,
    };
    let user: User;

    beforeEach(() => {
      user = new User(params);
    });

    it("Should change password", () => {
      const newPassword = "new1234";
      expect(user.get().password).toEqual(params.password);
      user.setPassword(newPassword);
      expect(user.get().password).toEqual(newPassword);
    });

    it("Should not change password", () => {
      const newPassword = params.password;
      expect(() => user.setPassword(newPassword)).toThrow(
        "An error occurred while changing the password.",
      );
    });

    it("Should not change password", () => {
      const newPassword = "";
      expect(() => user.setPassword(newPassword)).toThrow(
        "An error occurred while changing the password.",
      );
    });
  });

  describe("getStatus", () => {
    it("Should return the user status", () => {
      const params: UserParamsType = {
        username: "jonh_doe",
        password: "1234",
        access_level: AccessLevel.ADMINISTRATOR,
        personal_data: personalData,
        contact: contact,
      };
      const user = new User(params);
      expect(user.getStatus()).toBe(UserStatus.ACTIVE);
    });
  });

  describe("setStatus", () => {
    it("Should change the user status", () => {
      const params: UserParamsType = {
        username: "jonh_doe",
        password: "1234",
        access_level: AccessLevel.ADMINISTRATOR,
        personal_data: personalData,
        contact: contact,
      };
      const user = new User(params);

      user.setStatus(UserStatus.SUSPENDED);
      expect(user.getStatus()).toBe(UserStatus.SUSPENDED);
    });
  });
});
