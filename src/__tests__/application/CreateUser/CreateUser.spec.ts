import Cryptography from "@/application/accessories/Cryptography";
import CreateUser from "@/application/CreateUser/CreateUser";

import CreateUserOutputBoundary from "@/application/CreateUser/CreateUserOutputBoundary";
import InputBoundary from "@/application/InputBondary";
import { UserParamsType } from "@/core/@types/types";
import AccessLevel from "@/core/AccessLevel";
import UserRepository from "@/core/repositories/UserRepository";
import User from "@/core/User";

const repositoryMock: jest.Mocked<UserRepository> = {
  getOne: jest.fn(),
  getMany: jest.fn(),
  getAll: jest.fn(),
  save: jest.fn(),
};

const encrypterMock: jest.Mocked<Cryptography> = {
  compare: jest.fn(),
  encrypt: jest.fn(),
  setPlainText: jest.fn(),
};

const userData: UserParamsType = {
  username: "jonh_doe",
  password: "1234",
  access_level: AccessLevel.COMMON,
};

const inputBondaryMock: jest.Mocked<InputBoundary<UserParamsType>> = {
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
      repositoryMock.save.mockResolvedValue({
        id: "id-00001",
        status: "ATIVO",
        access_level: "COMMON",
        username: "jonh_doe",
        password: "1234",
      });
      encrypterMock.encrypt.mockResolvedValue(
        "pasdf4eas3r4rssw4535or5d1df44423eeda3",
      );

      const result = await userCreater.execute(inputBondaryMock);

      const resultUserInstance = result.get();
      // Assert
      expect(result).toBeInstanceOf(CreateUserOutputBoundary);
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

      // Act & Assert
      await expect(userCreater.execute(inputBondaryMock)).rejects.toThrow(
        "User already registered.",
      );

      // Verifica se o método save não foi chamado
      expect(repositoryMock.save).not.toHaveBeenCalled();
    });

    it("Should throws an error in case cannot possible save in db.", async () => {
      repositoryMock.getOne.mockResolvedValue(null);
      repositoryMock.save.mockResolvedValue(null);

      // Act & Assert
      await expect(userCreater.execute(inputBondaryMock)).rejects.toThrow(
        "An internal server error occurred.",
      );
    });
  });
});
