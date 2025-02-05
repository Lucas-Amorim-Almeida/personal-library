import EmailError from "@/domain/core/Errors/UserErrors/EmailError";
import Email from "@/domain/core/valueObjects/Email";

describe("Email", () => {
  describe("Constructor", () => {
    it("Should be an instance of Email", () => {
      const emailStr = "test@example.com";
      expect(new Email(emailStr)).toBeInstanceOf(Email);
    });

    it("Should throws an error of invalid email", () => {
      const emailStr = "test#example.com";
      expect(() => new Email(emailStr)).toThrow(EmailError);
    });
  });

  describe("get", () => {
    it("Should return an email", () => {
      const emailStr = "test@example.com";
      const email = new Email(emailStr);

      expect(email.get()).toBe(emailStr);
    });
  });

  describe("set", () => {
    it("Should change an email.", () => {
      const email = new Email("test@example.com");
      const emailChange = "change@example.com";
      email.set(emailChange);

      expect(email.get()).toBe(emailChange);
    });

    it("Should throws an error of invalid email", () => {
      const email = new Email("test@example.com");
      const emailChange = "change&example.com";

      expect(() => email.set(emailChange)).toThrow(EmailError);
    });
  });
});
