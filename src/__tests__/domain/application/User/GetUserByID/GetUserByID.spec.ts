import { dbUserExample, repositoryMock } from "@/__tests__/__mocks__/mocks";
import InputBoundary from "@/domain/application/InputBoundary";
import GetUserByID from "@/domain/application/User/GetUserByID/GetUserByID";
import UserOutputBoundary from "@/domain/application/User/UserOutputBoundary";

const inputMock: jest.Mocked<InputBoundary<{ id: string }>> = {
  get: jest.fn(() => ({ id: "id-0001" })),
};

describe("GetUserByID", () => {
  describe("Constructor", () => {
    it("Should be an instance of GetUserByID", () => {
      expect(new GetUserByID(repositoryMock)).toBeInstanceOf(GetUserByID);
    });
  });

  describe("execute", () => {
    it("Should return an instance of UserOutputBoundary class.", async () => {
      repositoryMock.getOne.mockResolvedValue(dbUserExample);

      const user = new GetUserByID(repositoryMock);

      expect(user.execute(inputMock)).resolves.toBeInstanceOf(Array);
      expect(repositoryMock.getOne).toHaveBeenCalledWith({ id: "id-0001" });

      const [dbUser] = await user.execute(inputMock);
      expect(dbUser).toBeInstanceOf(UserOutputBoundary);
      expect(dbUser.get().getId()).toBe("id-0001");
    });

    it("Should throws an error of User not found.", async () => {
      repositoryMock.getOne.mockResolvedValue(null);

      const user = new GetUserByID(repositoryMock);

      expect(user.execute(inputMock)).rejects.toThrow("User not found.");
      expect(repositoryMock.getOne).toHaveBeenCalledWith({ id: "id-0001" });
    });
  });
});
