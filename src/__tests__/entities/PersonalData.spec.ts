import { PersonalDataParamsType } from "@/entities/@types/types";
import PersonalData from "@/entities/PersonalData";

describe("PersonalData", () => {
  describe("Constructor", () => {
    it("Should be a instance of PersonsalData", () => {
      const params: PersonalDataParamsType = {
        name: "John Doe",
        cpf: "111.222.333-44",
        birth_date: new Date(2001, 1, 11),
      };

      expect(new PersonalData(params)).toBeInstanceOf(PersonalData);
    });

    it("Should be a instance of PersonsalData with timestamps", () => {
      const params: PersonalDataParamsType = {
        name: "John Doe",
        cpf: "111.222.333-44",
        birth_date: new Date(2001, 1, 11),
        created_at: new Date(2021, 1, 11),
        updated_at: new Date(2022, 2, 22),
      };

      expect(new PersonalData(params)).toBeInstanceOf(PersonalData);
    });
  });

  describe("get", () => {
    it("Should returns an object", () => {
      const params: PersonalDataParamsType = {
        name: "John Doe",
        cpf: "111.222.333-44",
        birth_date: new Date(2001, 1, 11),
      };

      const personalData = new PersonalData(params);

      expect(personalData.get()).toEqual(params);
    });

    it("Should returns an object with timestamps", () => {
      const params: PersonalDataParamsType = {
        name: "John Doe",
        cpf: "111.222.333-44",
        birth_date: new Date(2001, 1, 11),
        created_at: new Date(2021, 1, 11),
        updated_at: new Date(2022, 2, 22),
      };

      const personalData = new PersonalData(params);

      expect(personalData.get()).toEqual(params);
    });
  });
});
