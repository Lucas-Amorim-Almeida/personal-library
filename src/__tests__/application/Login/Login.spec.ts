import Cryptography from "@/application/accessories/Cryptography";
import InputBoundary from "@/application/InputBondary";
import Login from "@/application/Login/Login";
import LoginOutputBoundary from "@/application/Login/LoginOutputBoundary";
import UserRepository from "@/core/repositories/UserRepository";

const repositoryMock: jest.Mocked<UserRepository> = {
  getOne: jest.fn(),
  getMany: jest.fn(),
  getAll: jest.fn(),
  save: jest.fn(),
};

const encypterMock: jest.Mocked<Cryptography> = {
  compare: jest.fn(),
  encrypt: jest.fn(),
  setPlainText: jest.fn(),
};

const userData = {
  username: "jonh_doe",
  password: "1234",
};

const inputBondaryMock: jest.Mocked<
  InputBoundary<{ username: string; password: string }>
> = {
  get: jest.fn(() => userData),
};

describe("Login", () => {
  describe("Constructor", () => {
    expect(new Login(repositoryMock, encypterMock)).toBeInstanceOf(Login);
  });

  describe("execute", () => {
    it("Should be make login successfuly", async () => {
      const login = new Login(repositoryMock, encypterMock);

      //inputBondaryMock.get.mockResolvedValue(userData)
      repositoryMock.getOne.mockResolvedValue({
        id: "id-00001",
        status: "ATIVO",
        access_level: "COMMON",
        username: "jonh_doe",
        password: "1234",
      });
      encypterMock.compare.mockResolvedValue(true);

      const result = await login.execute(inputBondaryMock);

      expect(result).toBeInstanceOf(LoginOutputBoundary);
    });

    it("Should throws an erro of User not found.", async () => {
      const login = new Login(repositoryMock, encypterMock);
      repositoryMock.getOne.mockResolvedValue(null); //falhou em econtrar usuário no repositorio

      expect(login.execute(inputBondaryMock)).rejects.toThrow(
        "User not found.",
      );
    });
  });

  it("Should throws an erro of User is not available.", async () => {
    const login = new Login(repositoryMock, encypterMock);
    repositoryMock.getOne.mockResolvedValue({
      id: "id-00001",
      status: "A DELETAR",
      access_level: "COMMON",
      username: "jonh_doe",
      password: "1234",
    }); //access level invalido

    expect(login.execute(inputBondaryMock)).rejects.toThrow(
      "User is not available.",
    );
  });

  it("Should throws an erro of Password is incorrect.", async () => {
    const login = new Login(repositoryMock, encypterMock);
    repositoryMock.getOne.mockResolvedValue({
      id: "id-00001",
      status: "ATIVO",
      access_level: "COMMON",
      username: "jonh_doe",
      password: "1234",
    });

    encypterMock.compare.mockResolvedValue(false); //força a falha no teste de senha

    expect(login.execute(inputBondaryMock)).rejects.toThrow(
      "Password is incorrect.",
    );
  });
});
