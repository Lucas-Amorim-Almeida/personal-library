import {
  AdressParamsType,
  ContactParamsType,
  PersonalDataParamsType,
  UserParamsType,
} from "@/entities/@types/types";
import Adress from "@/entities/Adress";
import Contact from "@/entities/Contact";
import PersonalData from "@/entities/PersonalData";
import User from "@/entities/User";

describe("User", () => {
  const adressData: AdressParamsType = {
    street: "Rua X",
    number: "s/n",
    city: "São Paulo",
    state: "São Paulo",
    country: "Brasil",
    zip_code: "",
  };
  const contactData: ContactParamsType = {
    email: "jonh_doe@example.com",
    phone: ["(11) 9 1111-1111", "(22) 9 2222-2222"],
  };
  const personalDataInfo: PersonalDataParamsType = {
    name: "John Doe",
    cpf: "111.222.333-44",
    birth_date: new Date(2001, 1, 11),
  };

  let adress: Adress;
  let contact: Contact;
  let personalData: PersonalData;

  beforeEach(() => {
    adress = new Adress(adressData);
    contact = new Contact(contactData);
    personalData = new PersonalData(personalDataInfo);
  });

  describe("constructor", () => {
    it("should be a instance of User when object params is complete", () => {
      const params: UserParamsType = {
        username: "jonh_doe",
        password: "1234",
        personal_data: personalData,
        contact: contact,
        adress: adress,
      };
      const user = new User(params);

      expect(user).toBeInstanceOf(User);
    });

    it("should be a instance of User without all optional properties of params", () => {
      const params: UserParamsType = {
        username: "jonh_doe",
        password: "1234",
      };
      const user = new User(params);

      expect(user).toBeInstanceOf(User);
    });

    it("should be a instance of User with only adress", () => {
      const params: UserParamsType = {
        username: "jonh_doe",
        password: "1234",
        adress: adress,
      };
      const user = new User(params);

      expect(user).toBeInstanceOf(User);
    });

    it("should be a instance of User with only contact", () => {
      const params: UserParamsType = {
        username: "jonh_doe",
        password: "1234",
        contact: contact,
      };
      const user = new User(params);

      expect(user).toBeInstanceOf(User);
    });

    it("should be a instance of User with only personal_data", () => {
      const params: UserParamsType = {
        username: "jonh_doe",
        password: "1234",
        personal_data: personalData,
      };
      const user = new User(params);

      expect(user).toBeInstanceOf(User);
    });

    it("should be a instance of User without personal_data", () => {
      const params: UserParamsType = {
        username: "jonh_doe",
        password: "1234",
        contact: contact,
        adress: adress,
      };
      const user = new User(params);

      expect(user).toBeInstanceOf(User);
    });

    it("should be a instance of User without adress", () => {
      const params: UserParamsType = {
        username: "jonh_doe",
        password: "1234",
        personal_data: personalData,
        contact: contact,
      };
      const user = new User(params);

      expect(user).toBeInstanceOf(User);
    });

    it("should be a instance of User without contact", () => {
      const params: UserParamsType = {
        username: "jonh_doe",
        password: "1234",
        personal_data: personalData,
        adress: adress,
      };
      const user = new User(params);

      expect(user).toBeInstanceOf(User);
    });

    it("should be a instance of User with timestamps", () => {
      const params: UserParamsType = {
        username: "jonh_doe",
        password: "1234",
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
    };
    let user: User;

    beforeEach(() => {
      user = new User(params);
    });

    it("Should be change id", () => {
      const newId = "id-00001";
      expect(user.getId()).toBeUndefined();
      user.setId(newId);
      expect(user.getId()).toEqual(newId);
    });
  });

  describe("get", () => {
    it("Should be returns a object", () => {
      const params: UserParamsType = {
        username: "jonh_doe",
        password: "1234",
      };
      const user = new User(params);
      expect(user.get()).toEqual({
        username: params.username,
        password: expect.any(String),
      });
    });
    it("Should be returns a object when params object is complete", () => {
      const params: UserParamsType = {
        username: "jonh_doe",
        password: "1234",
        adress: adress,
        contact: contact,
        personal_data: personalData,
        created_at: new Date(2020, 2, 22),
        updated_at: new Date(2022, 2, 22),
      };
      const user = new User(params);
      expect(user.get()).toEqual({
        username: params.username,
        password: expect.any(String),
        adress: params.adress,
        contact: params.contact,
        personal_data: params.personal_data,
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      });
    });
  });

  describe("setPassword", () => {
    const params: UserParamsType = {
      username: "jonh_doe",
      password: "1234",
    };
    let user: User;

    beforeEach(() => {
      user = new User(params);
    });

    it("Should be change password", () => {
      const newPassword = "new1234";
      expect(user.get().password).toEqual(params.password);
      user.setPassword(newPassword);
      expect(user.get().password).toEqual(newPassword);
    });

    it("Should not be change password", () => {
      const newPassword = params.password;
      expect(() => user.setPassword(newPassword)).toThrow(
        "An error occurred while changing the password.",
      );
    });

    it("Should not be change password", () => {
      const newPassword = "";
      expect(() => user.setPassword(newPassword)).toThrow(
        "An error occurred while changing the password.",
      );
    });
  });
});
