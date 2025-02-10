import { dbUserExample } from "@/__tests__/__mocks__/mocks";
import UserPresenter from "@/infra/adapters/presenters/UserPresenters/UserPresenter";

describe("CreateUserPresenter", () => {
  describe("output", () => {
    it("Should return an object containing id, username and access_level.", () => {
      const presenter = new UserPresenter();

      expect(presenter.output(dbUserExample)).toEqual({
        id: dbUserExample.id,
        username: dbUserExample.username,
        access_level: dbUserExample.access_level,
      });
    });
  });
});
