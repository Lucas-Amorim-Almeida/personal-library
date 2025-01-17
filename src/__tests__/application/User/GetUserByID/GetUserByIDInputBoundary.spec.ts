import GetUserByIDInputBoundary from "@/application/User/GetUserByID/GetUserByIDInputBoundary";

describe("GetUserByIDInputBoundary", () => {
  describe("Constructor", () => {
    it("Should be an instance of GetUserByIDInputBoundary", () => {
      const id = "id-00001";
      expect(new GetUserByIDInputBoundary(id)).toBeInstanceOf(
        GetUserByIDInputBoundary,
      );
    });
    it("Should throws an error of Id is not valid.", () => {
      expect(() => new GetUserByIDInputBoundary("")).toThrow(
        "ID is not valid.",
      );
    });
  });

  describe("get", () => {
    it("Should return an object containing id property.", () => {
      const id = "id-00001";
      const input = new GetUserByIDInputBoundary(id);
      expect(input.get()).toEqual({ id });
    });
  });
});
