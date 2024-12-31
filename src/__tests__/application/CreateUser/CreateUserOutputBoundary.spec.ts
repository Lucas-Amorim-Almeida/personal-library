import CreateUserOutputBoundary from "@/application/CreateUser/CreateUserOutputBoundary";
import { UserParamsType } from "@/core/@types/types";
import AccessLevel from "@/core/AccessLevel";
import User from "@/core/User";

describe("CreateUserOutputBoundary", () => {
  describe("Constructor", () => {
    it("Should be an instance of CreateOutputBoundary", () => {
      const params: UserParamsType & { id: string } = {
        id: "id-00001",
        username: "jonh_doe",
        password: "1234",
        access_level: AccessLevel.COMMON,
        created_at: new Date(2020, 2, 22),
        updated_at: new Date(2022, 2, 22),
      };

      expect(new CreateUserOutputBoundary(params)).toBeInstanceOf(
        CreateUserOutputBoundary,
      );
    });
  });

  describe("get", () => {
    it("Should return an instance of User class", () => {
      const params: UserParamsType & { id: string } = {
        id: "id-00001",
        username: "jonh_doe",
        password: "1234",
        access_level: AccessLevel.COMMON,
        created_at: new Date(2020, 2, 22),
        updated_at: new Date(2022, 2, 22),
      };

      const output = new CreateUserOutputBoundary(params);
      expect(output.get()).toBeInstanceOf(User);
      expect(output.get().getId()).toBe(params.id);
    });
  });
});
