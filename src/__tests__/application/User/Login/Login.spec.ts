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

const inputBoundaryMock: jest.Mocked<
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

      repositoryMock.getOne.mockResolvedValue(dbUserExample);
      encrypterMock.compare.mockResolvedValue(true);

      expect(login.execute(inputBoundaryMock)).resolves.toBeInstanceOf(Array);

      const [result] = await login.execute(inputBoundaryMock);
      expect(result).toBeInstanceOf(UserOutputBoundary);

      expect(repositoryMock.getOne).toHaveBeenCalledWith({
        username: "jonh_doe",
      });
      expect(encrypterMock.compare).toHaveBeenCalledWith(
        dbUserExample.password,
      );
    });

    it("Should throws an erro of User not found.", async () => {
      const login = new Login(repositoryMock, encrypterMock);
      repositoryMock.getOne.mockResolvedValue(null); //falhou em econtrar usuário no repositorio

      expect(login.execute(inputBoundaryMock)).rejects.toThrow(
        "User not found.",
      );
      expect(repositoryMock.getOne).toHaveBeenCalledWith({
        username: "jonh_doe",
      });
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

    expect(login.execute(inputBoundaryMock)).rejects.toThrow(
      "User is not available.",
    );
    expect(repositoryMock.getOne).toHaveBeenCalledWith({
      username: "jonh_doe",
    });
  });

  it("Should throws an erro of Password is incorrect.", async () => {
    const login = new Login(repositoryMock, encrypterMock);
    repositoryMock.getOne.mockResolvedValue(dbUserExample);

    encrypterMock.compare.mockResolvedValue(false); //força a falha no teste de senha

    try {
      await login.execute(inputBoundaryMock);
    } catch (error) {
      expect(repositoryMock.getOne).toHaveBeenCalledWith({
        username: "jonh_doe",
      });
      expect(encrypterMock.compare).toHaveBeenCalledWith(
        dbUserExample.password,
      );

      expect(error).toEqual(new Error("Password is incorrect."));
    }
  });
});
