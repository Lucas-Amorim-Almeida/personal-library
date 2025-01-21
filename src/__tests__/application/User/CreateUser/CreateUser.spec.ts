import CreateUser from "@/application/User/CreateUser/CreateUser";
import UserOutputBoundary from "@/application/User/UserOutputBoundary";
import InputBoundary from "@/application/InputBoundary";
import { UserParamsType } from "@/core/@types/types";
import AccessLevel from "@/core/AccessLevel";
import User from "@/core/User";
import {
  dbUserExample,
  encrypterMock,
  repositoryMock,
} from "@/__tests__/__mocks__/mocks";

const userData: UserParamsType = {
  username: "john_doe",
  password: "1234",
  access_level: AccessLevel.COMMON,
};

const inputBoundaryMock: jest.Mocked<InputBoundary<UserParamsType>> = {
  get: jest.fn(() => userData),
};

describe("CreateUser", () => {
  describe("Constructor", () => {
    it("Should be an instance of CreateUser", () => {
      expect(new CreateUser(repositoryMock, encrypterMock)).toBeInstanceOf(
        CreateUser,
      );
    });
  });

  let userCreater: CreateUser;
  beforeEach(() => {
    userCreater = new CreateUser(repositoryMock, encrypterMock);
  });

  describe("execute", () => {
    it("Should creates an user successfull", async () => {
      // O método findByUsername retorna null, indicando que o usuário não existe
      repositoryMock.getOne.mockResolvedValue(null);
      repositoryMock.save.mockResolvedValue(dbUserExample);
      encrypterMock.encrypt.mockResolvedValue(
        "pasdf4eas3r4rssw4535or5d1df44423eeda3",
      );

      expect(userCreater.execute(inputBoundaryMock)).resolves.toBeInstanceOf(
        Array,
      );

      const [result] = await userCreater.execute(inputBoundaryMock);

      const resultUserInstance = result.get();
      expect(result).toBeInstanceOf(UserOutputBoundary);
      expect(result.get()).toBeInstanceOf(User);
      expect(resultUserInstance.get().username).toBe(userData.username);
      expect(resultUserInstance.get().access_level).toEqual(
        userData.access_level,
      );
      expect(resultUserInstance.get().id).toEqual(expect.any(String));
      expect(repositoryMock.save).toHaveBeenCalledWith(expect.any(User)); //verifica se o método foi chamado
      expect(encrypterMock.encrypt).toHaveBeenCalled();
    });

    it("Should throws an error in case of user already exists.", async () => {
      // Mock para indicar que o usuário já existe
      const existingUser = new User(userData);

      repositoryMock.getOne.mockResolvedValue(existingUser);

      expect(userCreater.execute(inputBoundaryMock)).rejects.toThrow(
        "User already registered.",
      );
      expect(repositoryMock.getOne).toHaveBeenCalledWith({
        username: "john_doe",
      });

      // Verifica se o método save não foi chamado
      expect(repositoryMock.save).not.toHaveBeenCalled();
    });

    it("Should throws an error in case cannot possible save in db.", async () => {
      repositoryMock.getOne.mockResolvedValue(null);
      repositoryMock.save.mockResolvedValue(null);

      try {
        await userCreater.execute(inputBoundaryMock);
      } catch (error) {
        expect(repositoryMock.getOne).toHaveBeenCalledWith({
          username: "john_doe",
        });
        expect(repositoryMock.save).toHaveBeenCalledWith(expect.any(User));
        expect(error).toEqual(new Error("An internal server error occurred."));
      }
    });
  });
});
