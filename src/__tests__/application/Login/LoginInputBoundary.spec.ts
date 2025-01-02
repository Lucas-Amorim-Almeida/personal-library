import LoginInputBoundary from "@/application/Login/LoginInputBoundary";

describe("LoginInputBoundary", () => {
  describe("Constructor", () => {
    it("Should be a instance of LoginInputBoundary", () => {
      expect(
        new LoginInputBoundary({ username: "john_doe", password: "1234" }),
      ).toBeInstanceOf(LoginInputBoundary);
    });
  });
  describe("get", () => {
    it("Should return an object with username and password props", () => {
      const input = new LoginInputBoundary({
        username: "john_doe",
        password: "1234",
      });
      expect(input.get()).toEqual({ username: "john_doe", password: "1234" });
    });
  });
});
