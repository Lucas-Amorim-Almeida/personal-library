import {
  dbUserExample,
  encrypterMock,
  repositoryMock,
} from "@/__tests__/__mocks__/mocks";
import NotAvailableError from "@/domain/application/Errors/NotAvailableError";
import EntityNotFoundError from "@/domain/application/Errors/EntityNotFoundError";
import PasswordIcorrectError from "@/domain/application/Errors/UserUseCaseErros/PasswordIcorrectError";
import InputBoundary from "@/domain/application/InputBoundary";
import Login from "@/domain/application/User/Login/Login";
import UserOutputBoundary from "@/domain/application/User/UserOutputBoundary";

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
        EntityNotFoundError,
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

    expect(login.execute(inputBoundaryMock)).rejects.toThrow(NotAvailableError);
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

      expect(error).toEqual(new PasswordIcorrectError());
    }
  });
});
