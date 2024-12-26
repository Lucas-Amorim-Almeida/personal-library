import { UserParamsType } from "@/entities/@types/types";
import User from "@/entities/User";

describe("User", () => {
  describe("constructor", () => {
    it("should be a instance of User when object params is complete", () => {
      const params: UserParamsType = {
        username: "jonh_doe",
        password: "1234",
        personal_data: {},
        contact: {},
        adress: {},
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
        adress: {},
      };
      const user = new User(params);

      expect(user).toBeInstanceOf(User);
    });

    it("should be a instance of User with only contact", () => {
      const params: UserParamsType = {
        username: "jonh_doe",
        password: "1234",
        contact: {},
      };
      const user = new User(params);

      expect(user).toBeInstanceOf(User);
    });

    it("should be a instance of User with only personal_data", () => {
      const params: UserParamsType = {
        username: "jonh_doe",
        password: "1234",
        personal_data: {},
      };
      const user = new User(params);

      expect(user).toBeInstanceOf(User);
    });

    it("should be a instance of User without personal_data", () => {
      const params: UserParamsType = {
        username: "jonh_doe",
        password: "1234",
        contact: {},
        adress: {},
      };
      const user = new User(params);

      expect(user).toBeInstanceOf(User);
    });

    it("should be a instance of User without adress", () => {
      const params: UserParamsType = {
        username: "jonh_doe",
        password: "1234",
        personal_data: {},
        contact: {},
      };
      const user = new User(params);

      expect(user).toBeInstanceOf(User);
    });

    it("should be a instance of User without contact", () => {
      const params: UserParamsType = {
        username: "jonh_doe",
        password: "1234",
        personal_data: {},
        adress: {},
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
        adress: {},
        contact: {},
        personal_data: {},
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
