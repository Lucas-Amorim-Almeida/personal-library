import { dbPersonalDataExample } from "@/__tests__/__mocks__/mocks";
import PersonalDataUpdateOutputBoundary from "@/application/User/PersonalDataUpdate/PersonalDataUpdateOutputBoundary";
import PersonalData from "@/core/PersonalData";

describe("PersonalDataUpdateOutputBoundary", () => {
  describe("Constructor", () => {
    it("Should be an instance of PersonalDataUpdateOutputBoundary", () => {
      expect(
        new PersonalDataUpdateOutputBoundary(dbPersonalDataExample),
      ).toBeInstanceOf(PersonalDataUpdateOutputBoundary);
    });
  });
  describe("get", () => {
    it("Should return an instance of PersonalData", () => {
      const output = new PersonalDataUpdateOutputBoundary(
        dbPersonalDataExample,
      );
      expect(output.get()).toBeInstanceOf(PersonalData);
    });
  });
});
