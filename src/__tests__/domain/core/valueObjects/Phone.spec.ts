import Phone from "@/domain/core/valueObjects/Phone";

describe("Phone", () => {
  describe("Constructor", () => {
    it("Should be a instance of Phone", () => {
      const phoneNumber = "+5511912345678";

      expect(new Phone(phoneNumber)).toBeInstanceOf(Phone);
    });

    it("Should return a error", () => {
      const phoneNumber = "+55119abc45678";

      expect(() => new Phone(phoneNumber)).toThrow(
        "Phone number is not valid.",
      );
    });
  });

  describe("set", () => {
    it("Should be an instance of Phone", () => {
      const newPhoneNumber = "+5511912345678";

      const phone = new Phone("+551191111111");
      phone.set(newPhoneNumber);
      expect(phone.get()).toBe(newPhoneNumber);
    });

    it("Should return an error", () => {
      const newPhoneNumber = "+55122";

      const phone = new Phone("+551191111111");

      expect(() => phone.set(newPhoneNumber)).toThrow(
        "Phone number is not valid.",
      );
    });
  });

  describe("get", () => {
    it("Should be a phone number", () => {
      const phoneNumber = "+5511912345678";
      const phone = new Phone(phoneNumber);

      expect(phone.get()).toBe(phoneNumber);
    });
  });
});
