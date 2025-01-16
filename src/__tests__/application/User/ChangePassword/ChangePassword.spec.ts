import ChangePassword from "@/application/User/ChangePassword/ChangePassword";
import InputBoundary from "@/application/InputBoundary";
import {
  dbUserExample,
  encrypterMock,
  repositoryMock,
} from "@/__tests__/__mocks__/mocks";
import UserOutputBoundary from "@/application/User/UserOutputBoundary";

const inputParams = {
  id: "id-0001",
  current_password: "1234",
  new_password: "4321",
};

const inputBoundaryMock: jest.Mocked<
  InputBoundary<{ id: string; current_password: string; new_password: string }>
> = {
  get: jest.fn(() => inputParams),
};

describe("ChangePassword", () => {
  describe("Constructor", () => {
    it("Should be an instance of ChangePassword", () => {
      expect(new ChangePassword(repositoryMock, encrypterMock)).toBeInstanceOf(
        ChangePassword,
      );
    });
  });

  describe("execute", () => {
    it("Should return an instance of OutputBundary with a new password", async () => {
      const changePassword = new ChangePassword(repositoryMock, encrypterMock);

      repositoryMock.getOne.mockResolvedValue(dbUserExample);
      encrypterMock.compare.mockResolvedValue(true);
      encrypterMock.encrypt.mockResolvedValue("1ja2sbd3aie4u39682yejas");
      repositoryMock.update.mockResolvedValue({
        id: "id-0001",
        username: "john_doe",
        password: "1ja2sbd3aie4u39682yejas",
        status: "ATIVO",
        access_level: "COMMON",
        created_at: new Date(2020, 2, 22),
        updated_at: new Date(2022, 2, 22),
      });

      expect(changePassword.execute(inputBoundaryMock)).resolves.toBeInstanceOf(
        UserOutputBoundary,
      );

      const response = await changePassword.execute(inputBoundaryMock);
      expect(response.get().get().password).toEqual("1ja2sbd3aie4u39682yejas");
    });

    it("Should throws an error of User not found.", async () => {
      const changePassword = new ChangePassword(repositoryMock, encrypterMock);

      repositoryMock.getOne.mockResolvedValue(null);
      expect(changePassword.execute(inputBoundaryMock)).rejects.toThrow(
        "User not found.",
      );
    });

    it("Should throws an error of The current password is incorrect.", async () => {
      const changePassword = new ChangePassword(repositoryMock, encrypterMock);

      repositoryMock.getOne.mockResolvedValue(dbUserExample);
      encrypterMock.compare.mockResolvedValue(false);
      expect(changePassword.execute(inputBoundaryMock)).rejects.toThrow(
        "The current password is incorrect.",
      );
    });

    it("Should throws an error of An internal server error occurred.", async () => {
      const changePassword = new ChangePassword(repositoryMock, encrypterMock);

      repositoryMock.getOne.mockResolvedValue(dbUserExample);
      encrypterMock.compare.mockResolvedValue(true);
      encrypterMock.encrypt.mockResolvedValue("1ja2sbd3aie4u39682yejas");
      repositoryMock.update.mockResolvedValue(null);

      expect(changePassword.execute(inputBoundaryMock)).rejects.toThrow(
        "An internal server error occurred.",
      );
    });
  });
});
