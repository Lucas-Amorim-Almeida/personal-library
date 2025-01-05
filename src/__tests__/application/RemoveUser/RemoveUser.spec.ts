import InputBoundary from "@/application/InputBondary";
import RemoveUser from "@/application/RemoveUser/RemoveUser";
import RemoveUserOutputBoundary from "@/application/RemoveUser/RemoveUserOutputBoundary";
import UserRepository from "@/core/repositories/UserRepository";

const repositoryMock: jest.Mocked<UserRepository> = {
  getAll: jest.fn(),
  getOne: jest.fn(),
  getMany: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
};

const params: { id: string } = { id: "id-0001" };

const inputBondary: jest.Mocked<InputBoundary<{ id: string }>> = {
  get: jest.fn(() => params),
};

describe("RemoveUser", () => {
  describe("Constructor", () => {
    it("Should be an instance of RemoveUser", () => {
      expect(new RemoveUser(repositoryMock)).toBeInstanceOf(RemoveUser);
    });
  });

  describe("execute", () => {
    it("Should change status of user to 'A DELETAR' successfully.", async () => {
      const removeUser = new RemoveUser(repositoryMock);

      repositoryMock.getOne.mockResolvedValue({
        id: "id-0001",
        username: "john_doe",
        password: "1234",
        status: "ATIVO",
        access_level: "COMMON",
        created_at: new Date(2020, 2, 22),
        updated_at: new Date(2022, 2, 22),
      });
      repositoryMock.update.mockResolvedValue({
        id: "id-0001",
        username: "john_doe",
        password: "1234",
        status: "ATIVO",
        access_level: "A DELETAR",
        created_at: new Date(2020, 2, 22),
        updated_at: new Date(2022, 2, 22),
      });

      expect(removeUser.execute(inputBondary)).resolves.toBeInstanceOf(
        RemoveUserOutputBoundary,
      );
    });

    it("Should throws an error User not found.", async () => {
      const removeUser = new RemoveUser(repositoryMock);

      repositoryMock.getOne.mockResolvedValue(null);

      expect(removeUser.execute(inputBondary)).rejects.toThrow(
        "User not found.",
      );
    });

    it("Should throws an interenal error", async () => {
      const removeUser = new RemoveUser(repositoryMock);

      repositoryMock.getOne.mockResolvedValue({
        id: "id-0001",
        username: "john_doe",
        password: "1234",
        status: "ATIVO",
        access_level: "COMMON",
        created_at: new Date(2020, 2, 22),
        updated_at: new Date(2022, 2, 22),
      });
      repositoryMock.update.mockResolvedValue(null);

      expect(() => removeUser.execute(inputBondary)).rejects.toThrow(
        "An internal server error has occurred.",
      );
    });
  });
});
