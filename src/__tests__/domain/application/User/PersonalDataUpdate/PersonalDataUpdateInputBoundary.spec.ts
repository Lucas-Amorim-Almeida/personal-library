import InvalidFieldError from "@/domain/application/Errors/InvalidFieldError";
import PersonalDataUpdateInputBoundary from "@/domain/application/User/PersonalDataUpdate/PersonalDataUpdateInputBoundary";

describe("PersonalDataUpdateInputBoundary", () => {
  describe("Constructor", () => {
    it("Should be an instance of PersonalDataUpdateInputBoundary", () => {
      const inputParams = {
        user_id: "id-000001",
        name: "Johnathan Someone",
        birth_date: new Date(2000, 1, 11),
      };
      const inputParamsStringDate = {
        user_id: "id-000001",
        name: "Johnathan Someone",
        birth_date: "2000-01-11",
      };
      expect(new PersonalDataUpdateInputBoundary(inputParams)).toBeInstanceOf(
        PersonalDataUpdateInputBoundary,
      );
      expect(
        new PersonalDataUpdateInputBoundary(inputParamsStringDate),
      ).toBeInstanceOf(PersonalDataUpdateInputBoundary);
    });

    it("Should throws an error of birth_date format is not valid.", () => {
      const inputParams = {
        user_id: "id-000001",
        name: "Johnathan Someone",
        birth_date: "invalido",
      };
      expect(() => new PersonalDataUpdateInputBoundary(inputParams)).toThrow(
        InvalidFieldError,
      );
    });
  });

  describe("get", () => {
    it("Should return an object with user_id, name or birth_date", () => {
      const inputParams = {
        user_id: "id-000001",
        name: "Johnathan Someone",
        birth_date: new Date(2000, 1, 11),
      };
      const inputParamsStringDate = {
        user_id: "id-000001",
        name: "Johnathan Someone",
        birth_date: "2000-01-11",
      };
      const intput = new PersonalDataUpdateInputBoundary(inputParams);
      expect(intput.get()).toEqual(inputParams);

      const intputStringDate = new PersonalDataUpdateInputBoundary(
        inputParamsStringDate,
      );
      expect(intputStringDate.get()).toEqual({
        user_id: "id-000001",
        name: "Johnathan Someone",
        birth_date: new Date("2000-01-11"),
      });
    });
  });
});
