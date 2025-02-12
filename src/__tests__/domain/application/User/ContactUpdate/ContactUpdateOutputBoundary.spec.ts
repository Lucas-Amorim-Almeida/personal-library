import { dbContactExample } from "@/__tests__/__mocks__/mocks";
import ContactUpdateOutputBoundary from "@/domain/application/User/ContactUpdate/ContactUpdateOutputBoundary";

describe("ContactUpdateOutputBoundary", () => {
  describe("Constructor", () => {
    it("Should be an instance of ContactUpdateOutputBoundary", () => {
      expect(new ContactUpdateOutputBoundary(dbContactExample)).toBeInstanceOf(
        ContactUpdateOutputBoundary,
      );
    });
  });

  describe("get", () => {
    it("Should be an instance of Contact", () => {
      const output = new ContactUpdateOutputBoundary(dbContactExample);
      expect(output.get()).toEqual(dbContactExample);
    });
  });
});
