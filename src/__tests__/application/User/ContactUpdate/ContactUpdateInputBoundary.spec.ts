import ContactUpdateInputBoundary from "@/application/User/ContactUpdate/ContactUpdateInputBoundary";
import Email from "@/core/valueObjects/Email";
import Phone from "@/core/valueObjects/Phone";

describe("ContactUpdateInputBoundary", () => {
  describe("Should be an instance of ContactUpdateInputBoundary", () => {
    it("Constructor", () => {
      const params = {
        user_id: "id-00001",
        email: "jonh_do02e@example.com",
        phone: ["+5511911111110"],
      };
      expect(new ContactUpdateInputBoundary(params)).toBeInstanceOf(
        ContactUpdateInputBoundary,
      );
    });

    it("Should throws an error of Email class.", () => {
      const params = {
        user_id: "id-00001",
        email: "jonh_do02e#example.com",
        phone: ["+5511911111110"],
      };
      expect(() => new ContactUpdateInputBoundary(params)).toThrow(
        "Email is not valid.",
      );
    });
    it("Should throws an error of Phone class", () => {
      const params = {
        user_id: "id-00001",
        email: "jonh_do02e@example.com",
        phone: ["+551191"],
      };
      expect(() => new ContactUpdateInputBoundary(params)).toThrow(
        "Phone number is not valid.",
      );
    });
  });

  describe("get", () => {
    it("Should return an object with user_id, email and phone list to update.", () => {
      const params = {
        user_id: "id-00001",
        email: "jonh_do02e@example.com",
        phone: ["+5511911111110"],
      };
      const input = new ContactUpdateInputBoundary(params);

      expect(input.get()).toEqual({
        user_id: "id-00001",
        email: new Email("jonh_do02e@example.com"),
        phone: [new Phone("+5511911111110")],
      });
    });
  });
});
