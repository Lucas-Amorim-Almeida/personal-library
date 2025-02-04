import { dbUserExample } from "@/__tests__/__mocks__/mocks";
import CreateUserPresenter from "@/infra/adapters/presenters/UserPresenters/CreateUserPresenter";

describe("CreateUserPresenter", () => {
  describe("output", () => {
    it("Should return an object containing id, username and access_level.", () => {
      const presenter = new CreateUserPresenter();

      expect(presenter.output(dbUserExample)).toEqual({
        id: dbUserExample.id,
        username: dbUserExample.username,
        access_level: dbUserExample.access_level,
      });
    });
  });
});
