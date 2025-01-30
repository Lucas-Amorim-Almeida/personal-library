import { dbContactExample } from "@/__tests__/__mocks__/mocks";
import ContactUpdateOutputBoundary from "@/domain/application/User/ContactUpdate/ContactUpdateOutputBoundary";
import Contact from "@/domain/core/Contact";

describe("ContactUpdateOutputBoundary", () => {
  describe("Constructor", () => {
    it("Should be an instance of ContactUpdateOutputBoundary", () => {
      expect(new ContactUpdateOutputBoundary(dbContactExample)).toBeInstanceOf(
        ContactUpdateOutputBoundary,
      );
    });

    it("Should throw an error of Email class", () => {
      const params = {
        id: "id-123456",
        email: "jonh_doe#example.com",
        phone: ["+5511911111110"],
        created_at: new Date(2020, 2, 22),
        updated_at: new Date(2022, 2, 22),
      };
      expect(() => new ContactUpdateOutputBoundary(params)).toThrow(
        "Email is not valid.",
      );
    });

    it("Should throw an error of Phone class", () => {
      const params = {
        id: "id-123456",
        email: "jonh_doe@example.com",
        phone: ["+55119111"],
        created_at: new Date(2020, 2, 22),
        updated_at: new Date(2022, 2, 22),
      };
      expect(() => new ContactUpdateOutputBoundary(params)).toThrow(
        "Phone number is not valid.",
      );
    });
  });

  describe("get", () => {
    it("Should be an instance of Contact", () => {
      const output = new ContactUpdateOutputBoundary(dbContactExample);
      expect(output.get()).toBeInstanceOf(Contact);
    });
  });
});
