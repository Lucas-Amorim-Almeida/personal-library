import {
  dbUserExample,
  encrypterMock,
  repositoryMock,
} from "@/__tests__/__mocks__/mocks";
import InputBoundary from "@/application/InputBoundary";
import Login from "@/application/User/Login/Login";
import UserOutputBoundary from "@/application/User/UserOutputBoundary";

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
    expect(new Login(repositoryMock, encrypterMock)).toBeInstanceOf(Login);
  });

  describe("execute", () => {
    it("Should be make login successfuly", async () => {
      const login = new Login(repositoryMock, encrypterMock);

      //inputBondaryMock.get.mockResolvedValue(userData)
      repositoryMock.getOne.mockResolvedValue(dbUserExample);
      encrypterMock.compare.mockResolvedValue(true);

      const result = await login.execute(inputBondaryMock);

      expect(result).toBeInstanceOf(UserOutputBoundary);
    });

    it("Should throws an erro of User not found.", async () => {
      const login = new Login(repositoryMock, encrypterMock);
      repositoryMock.getOne.mockResolvedValue(null); //falhou em econtrar usuário no repositorio

      expect(login.execute(inputBondaryMock)).rejects.toThrow(
        "User not found.",
      );
    });
  });

  it("Should throws an erro of User is not available.", async () => {
    const login = new Login(repositoryMock, encrypterMock);
    repositoryMock.getOne.mockResolvedValue({
      id: "id-00001",
      status: "A DELETAR",
      access_level: "COMMON",
      username: "jonh_doe",
      password: "1234",
    }); //user status invalido

    expect(login.execute(inputBondaryMock)).rejects.toThrow(
      "User is not available.",
    );
  });

  it("Should throws an erro of Password is incorrect.", async () => {
    const login = new Login(repositoryMock, encrypterMock);
    repositoryMock.getOne.mockResolvedValue(dbUserExample);

    encrypterMock.compare.mockResolvedValue(false); //força a falha no teste de senha

    expect(login.execute(inputBondaryMock)).rejects.toThrow(
      "Password is incorrect.",
    );
  });
});
