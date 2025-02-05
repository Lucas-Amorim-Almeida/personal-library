import {
  dbPersonalDataExample,
  repositoryMock,
} from "@/__tests__/__mocks__/mocks";
import FieldRequiredError from "@/domain/application/Errors/FieldRequiredError";
import InternalServerError from "@/domain/application/Errors/InternalServerError";
import NotFoundError from "@/domain/application/Errors/NotFoundError";
import InputBoundary from "@/domain/application/InputBoundary";
import PersonalDataUpdate from "@/domain/application/User/PersonalDataUpdate/PersonalDataUpdate";
import PersonalDataUpdateOutputBoundary from "@/domain/application/User/PersonalDataUpdate/PersonalDataUpdateOutputBoundary";

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
      repositoryMock.getOne.mockResolvedValue(dbPersonalDataExample);
      repositoryMock.update.mockResolvedValue({
        id: "id-123456",
        name: "Johnathan Someone",
        birth_date: new Date(2000, 1, 11),
        created_at: new Date(2020, 2, 22),
        updated_at: new Date(2022, 2, 22),
      });

      const personalDataUpdate = new PersonalDataUpdate(repositoryMock);
      expect(personalDataUpdate.execute(inputBoundary)).resolves.toBeInstanceOf(
        Array,
      );

      const [response] = await personalDataUpdate.execute(inputBoundary);
      expect(response).toBeInstanceOf(PersonalDataUpdateOutputBoundary);
      expect(repositoryMock.getOne).toHaveBeenCalledWith({ id: "id-000001" });
      expect(repositoryMock.update).toHaveBeenCalledWith({
        query: { id: "id-000001" },
        update_fields: {
          name: "Johnathan Someone",
          birth_date: new Date(2000, 1, 11),
        },
      });
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
      ).rejects.toThrow(FieldRequiredError);
    });

    it("Should throws an error of User or Personal data not found.", async () => {
      const personalDataUpdate = new PersonalDataUpdate(repositoryMock);

      repositoryMock.getOne.mockResolvedValue(null);

      expect(personalDataUpdate.execute(inputBoundary)).rejects.toThrow(
        NotFoundError,
      );
      expect(repositoryMock.getOne).toHaveBeenCalledWith({ id: "id-000001" });
    });

    it("Should throws an error of An internal server error occurred.", async () => {
      const personalDataUpdate = new PersonalDataUpdate(repositoryMock);

      repositoryMock.getOne.mockResolvedValue(dbPersonalDataExample);
      repositoryMock.update.mockResolvedValue(null);

      try {
        await personalDataUpdate.execute(inputBoundary);
      } catch (error) {
        expect(repositoryMock.getOne).toHaveBeenCalledWith({ id: "id-000001" });
        expect(repositoryMock.update).toHaveBeenCalledWith({
          query: { id: "id-000001" },
          update_fields: {
            name: "Johnathan Someone",
            birth_date: new Date(2000, 1, 11),
          },
        });
        expect(error).toEqual(new InternalServerError());
      }
    });
  });
});
