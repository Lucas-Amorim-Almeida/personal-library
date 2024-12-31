import { ContactParamsType } from "@/core/@types/types";
import Contact from "@/core/Contact";
import Email from "@/core/valueObjects/Email";
import Phone from "@/core/valueObjects/Phone";

describe("Contact", () => {
  describe("Constructor", () => {
    it("Should be an instance of Contact class", () => {
      const params: ContactParamsType = {
        email: new Email("jonh_doe@example.com"),
        phone: [new Phone("+5511911111111"), new Phone("+5522922222222")],
      };

      expect(new Contact(params)).toBeInstanceOf(Contact);
    });

    it("Should be an instance of Contact class with timestamp", () => {
      const params: ContactParamsType = {
        email: new Email("jonh_doe@example.com"),
        phone: [new Phone("+5511911111111"), new Phone("+5522922222222")],
        created_at: new Date(2020, 2, 20),
        updated_at: new Date(20222, 2, 22),
      };

      expect(new Contact(params)).toBeInstanceOf(Contact);
    });
  });

  describe("get", () => {
    it("Should retun an object", () => {
      const params: ContactParamsType = {
        email: new Email("jonh_doe@example.com"),
        phone: [new Phone("+5511911111111"), new Phone("+5522922222222")],
      };

      const contact = new Contact(params);
      expect(contact.get()).toEqual(params);
    });
    it("Should retun an object with timestamps", () => {
      const params: ContactParamsType = {
        email: new Email("jonh_doe@example.com"),
        phone: [new Phone("+5511911111111"), new Phone("+5522922222222")],
        created_at: new Date(2020, 2, 20),
        updated_at: new Date(20222, 2, 22),
      };

      const contact = new Contact(params);
      expect(contact.get()).toEqual(params);
    });
  });
});
