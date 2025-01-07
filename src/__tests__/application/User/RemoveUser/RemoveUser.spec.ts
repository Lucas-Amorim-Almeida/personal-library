import { dbUserExample, repositoryMock } from "@/__tests__/__mocks__/mocks";
import InputBoundary from "@/application/InputBoundary";
import RemoveUser from "@/application/User/RemoveUser/RemoveUser";
import RemoveUserOutputBoundary from "@/application/User/RemoveUser/RemoveUserOutputBoundary";

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

      repositoryMock.getOne.mockResolvedValue(dbUserExample);
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

      repositoryMock.getOne.mockResolvedValue(dbUserExample);
      repositoryMock.update.mockResolvedValue(null);

      expect(() => removeUser.execute(inputBondary)).rejects.toThrow(
        "An internal server error has occurred.",
      );
    });
  });
});
