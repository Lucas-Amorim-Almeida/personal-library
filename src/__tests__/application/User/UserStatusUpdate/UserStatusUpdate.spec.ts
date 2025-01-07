import { dbUserExample, repositoryMock } from "@/__tests__/__mocks__/mocks";
import InputBoundary from "@/application/InputBoundary";
import UserStatusUpdate from "@/application/User/UserStatusUpdate/UserStatusUpdate";
import UserStatusUpdateOutputBoundary from "@/application/User/UserStatusUpdate/UserStatusUpdateOutputBoundary";
import UserStatus from "@/core/UserStatus";

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

      repositoryMock.getOne.mockResolvedValue(dbUserExample);
      repositoryMock.update.mockResolvedValue({
        id: "id-0001",
        username: "john_doe",
        password: "1234",
        status: "BANIDO",
        access_level: "COMMON",
        created_at: new Date(2020, 2, 22),
        updated_at: new Date(2022, 2, 22),
      });

      expect(statusUpdate.execute(inputBoundaryMock)).resolves.toBeInstanceOf(
        UserStatusUpdateOutputBoundary,
      );

      const response = await statusUpdate.execute(inputBoundaryMock);
      expect(response.get().getStatus()).toEqual(UserStatus.BANNED);
    });

    it("Should throws an error User not found.", async () => {
      const statusUpdate = new UserStatusUpdate(repositoryMock);

      repositoryMock.getOne.mockResolvedValue(null);

      expect(statusUpdate.execute(inputBoundaryMock)).rejects.toThrow(
        "User not found.",
      );
    });

    it("Should throws an internal error.", async () => {
      const statusUpdate = new UserStatusUpdate(repositoryMock);

      repositoryMock.getOne.mockResolvedValue(dbUserExample);
      repositoryMock.update.mockResolvedValue(null);

      expect(statusUpdate.execute(inputBoundaryMock)).rejects.toThrow(
        "An internal server error has occurred.",
      );
    });
  });
});
