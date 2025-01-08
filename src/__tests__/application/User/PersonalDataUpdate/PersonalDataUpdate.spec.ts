import {
  dbPersonalDataExample,
  repositoryMock,
} from "@/__tests__/__mocks__/mocks";
import InputBoundary from "@/application/InputBoundary";
import PersonalDataUpdate from "@/application/User/PersonalDataUpdate/PersonalDataUpdate";
import PersonalDataUpdateOutputBoundary from "@/application/User/PersonalDataUpdate/PersonalDataUpdateOutputBoundary";

const inputParams = {
  user_id: "id-000001",
  name: "Johnathan Someone",
  birth_date: new Date(2000, 1, 11),
};
const inputBoundary: jest.Mocked<
  InputBoundary<{ user_id: string; name?: string; birth_date?: Date }>
> = {
  get: jest.fn(() => inputParams),
};

describe("PersonalDataUpdate", () => {
  describe("Constructor", () => {
    it("Should be an instance of PersonalDataUpdate", () => {
      expect(new PersonalDataUpdate(repositoryMock)).toBeInstanceOf(
        PersonalDataUpdate,
      );
    });
  });

  describe("execute", () => {
    it("Should be an instance of PersonalDataUpdateOutputBoundary.", async () => {
      const personalDataUpdate = new PersonalDataUpdate(repositoryMock);

      repositoryMock.getOne.mockResolvedValue(dbPersonalDataExample);
      repositoryMock.update.mockResolvedValue({
        id: "id-123456",
        name: "Johnathan Someone",
        birth_date: new Date(2000, 1, 11),
        created_at: new Date(2020, 2, 22),
        updated_at: new Date(2022, 2, 22),
      });

      expect(personalDataUpdate.execute(inputBoundary)).resolves.toBeInstanceOf(
        PersonalDataUpdateOutputBoundary,
      );
    });

    it("Should throws an error of name or birth_date is required.", async () => {
      const personalDataUpdate = new PersonalDataUpdate(repositoryMock);

      const inputBoundaryWithoutID: jest.Mocked<
        InputBoundary<{ user_id: string; name?: string; birth_date?: Date }>
      > = {
        get: jest.fn(() => ({ user_id: "id-000001" })),
      };

      expect(
        personalDataUpdate.execute(inputBoundaryWithoutID),
      ).rejects.toThrow("name or birth_date is required.");
    });

    it("Should throws an error of User or Personal data not found.", async () => {
      const personalDataUpdate = new PersonalDataUpdate(repositoryMock);

      repositoryMock.getOne.mockResolvedValue(null);

      expect(personalDataUpdate.execute(inputBoundary)).rejects.toThrow(
        "User or Personal data not found.",
      );
    });

    it("Should throws an error of An internal server error occurred.", async () => {
      const personalDataUpdate = new PersonalDataUpdate(repositoryMock);

      repositoryMock.getOne.mockResolvedValue(dbPersonalDataExample);
      repositoryMock.update.mockResolvedValue(null);

      expect(() => personalDataUpdate.execute(inputBoundary)).rejects.toThrow(
        "An internal server error occurred.",
      );
    });
  });
});
