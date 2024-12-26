import { ContactParamsType } from "@/entities/@types/types";
import Contact from "@/entities/Contact";

describe("Contact", () => {
  describe("Constructor", () => {
    it("Should be a instance of Contact class", () => {
      const params: ContactParamsType = {
        email: "jonh_doe@example.com",
        phone: ["(11) 9 1111-1111", "(22) 9 2222-2222"],
      };

      expect(new Contact(params)).toBeInstanceOf(Contact);
    });

    it("Should be a instance of Contact class with timestamp", () => {
      const params: ContactParamsType = {
        email: "jonh_doe@example.com",
        phone: ["(11) 9 1111-1111", "(22) 9 2222-2222"],
        created_at: new Date(2020, 2, 20),
        updated_at: new Date(20222, 2, 22),
      };

      expect(new Contact(params)).toBeInstanceOf(Contact);
    });
  });

  describe("get", () => {
    it("Should retuns a object", () => {
      const params: ContactParamsType = {
        email: "jonh_doe@example.com",
        phone: ["(11) 9 1111-1111", "(22) 9 2222-2222"],
      };

      const contact = new Contact(params);
      expect(contact.get()).toEqual(params);
    });
    it("Should retuns a object with timestamps", () => {
      const params: ContactParamsType = {
        email: "jonh_doe@example.com",
        phone: ["(11) 9 1111-1111", "(22) 9 2222-2222"],
        created_at: new Date(2020, 2, 20),
        updated_at: new Date(20222, 2, 22),
      };

      const contact = new Contact(params);
      expect(contact.get()).toEqual(params);
    });
  });
});
