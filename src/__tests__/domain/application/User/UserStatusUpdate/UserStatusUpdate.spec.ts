import { dbUserExample, repositoryMock } from "@/__tests__/__mocks__/mocks";
import InternalError from "@/domain/application/Errors/InternalError";
import EntityNotFoundError from "@/domain/application/Errors/EntityNotFoundError";
import InputBoundary from "@/domain/application/InputBoundary";
import UserOutputBoundary from "@/domain/application/User/UserOutputBoundary";
import UserStatusUpdate from "@/domain/application/User/UserStatusUpdate/UserStatusUpdate";
import UserStatus from "@/domain/core/UserStatus";

type InputParams = {
  id: string;
  status: UserStatus;
};

const inputParams = { id: "id-000001", status: UserStatus.BANNED };
const inputBoundaryMock: jest.Mocked<InputBoundary<InputParams>> = {
  get: jest.fn(() => inputParams),
};

describe("UserStatusUpdate", () => {
  describe("Constructor", () => {
    it("Should be an instance of UserStatusUpdate", () => {
      expect(new UserStatusUpdate(repositoryMock)).toBeInstanceOf(
        UserStatusUpdate,
      );
    });
  });

  describe("execute", () => {
    it("Should return an instance of OutputBoundary with other user status", async () => {
      const statusUpdate = new UserStatusUpdate(repositoryMock);

      const updatedUserMock = {
        _id: "id-0001",
        username: "john_doe",
        password: "1234",
        status: "BANIDO",
        access_level: "COMMON",
        created_at: new Date(2020, 2, 22),
        updated_at: new Date(2022, 2, 22),
      };

      repositoryMock.getOne.mockResolvedValue(dbUserExample);
      repositoryMock.update.mockResolvedValue(updatedUserMock);

      expect(statusUpdate.execute(inputBoundaryMock)).resolves.toBeInstanceOf(
        Array,
      );

      const [response] = await statusUpdate.execute(inputBoundaryMock);
      expect(response).toBeInstanceOf(UserOutputBoundary);
      expect(response.get()).toEqual(updatedUserMock);
      expect(repositoryMock.getOne).toHaveBeenCalledWith({ _id: "id-000001" });
      expect(repositoryMock.update).toHaveBeenCalledWith({
        query: { _id: "id-000001" },
        update_fields: { status: UserStatus.BANNED },
      });
    });

    it("Should throws an error User not found.", async () => {
      const statusUpdate = new UserStatusUpdate(repositoryMock);

      repositoryMock.getOne.mockResolvedValue(null);

      expect(statusUpdate.execute(inputBoundaryMock)).rejects.toThrow(
        EntityNotFoundError,
      );
      expect(repositoryMock.getOne).toHaveBeenCalledWith({ _id: "id-000001" });
    });

    it("Should throws an internal error.", async () => {
      repositoryMock.getOne.mockResolvedValue(dbUserExample);
      repositoryMock.update.mockResolvedValue(null);

      const statusUpdate = new UserStatusUpdate(repositoryMock);

      try {
        await statusUpdate.execute(inputBoundaryMock);
      } catch (error) {
        expect(repositoryMock.getOne).toHaveBeenCalledWith({
          _id: "id-000001",
        });
        expect(repositoryMock.update).toHaveBeenCalledWith({
          query: { _id: "id-000001" },
          update_fields: { status: UserStatus.BANNED },
        });
        expect(error).toEqual(new InternalError());
      }
    });
  });
});
