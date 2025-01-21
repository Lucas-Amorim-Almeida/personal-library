import { dbUserExample, repositoryMock } from "@/__tests__/__mocks__/mocks";
import InputBoundary from "@/application/InputBoundary";
import RemoveUser from "@/application/User/RemoveUser/RemoveUser";
import RemoveUserOutputBoundary from "@/application/User/RemoveUser/RemoveUserOutputBoundary";
import UserStatus from "@/core/UserStatus";

const params: { id: string } = { id: "id-0001" };

const inputBoundary: jest.Mocked<InputBoundary<{ id: string }>> = {
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

      expect(removeUser.execute(inputBoundary)).resolves.toBeInstanceOf(Array);
      const [response] = await removeUser.execute(inputBoundary);
      expect(response).toBeInstanceOf(RemoveUserOutputBoundary);
      expect(repositoryMock.getOne).toHaveBeenCalledWith(params);
      expect(repositoryMock.update).toHaveBeenCalledWith({
        status: UserStatus.TO_DELETE,
        ...params,
      });
    });

    it("Should throws an error User not found.", async () => {
      const removeUser = new RemoveUser(repositoryMock);

      repositoryMock.getOne.mockResolvedValue(null);

      expect(removeUser.execute(inputBoundary)).rejects.toThrow(
        "User not found.",
      );
      expect(repositoryMock.getOne).toHaveBeenCalledWith({ id: "id-0001" });
    });

    it("Should throws an interenal error", async () => {
      const removeUser = new RemoveUser(repositoryMock);

      repositoryMock.getOne.mockResolvedValue(dbUserExample);
      repositoryMock.update.mockResolvedValue(null);

      try {
        await removeUser.execute(inputBoundary);
      } catch (error) {
        expect(repositoryMock.getOne).toHaveBeenCalledWith({ id: "id-0001" });
        expect(repositoryMock.update).toHaveBeenCalledWith({
          id: "id-0001",
          status: UserStatus.TO_DELETE,
        });
        expect(error).toEqual(
          new Error("An internal server error has occurred."),
        );
      }
    });
  });
});
