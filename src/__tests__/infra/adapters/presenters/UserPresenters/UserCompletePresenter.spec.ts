import { dbUserExample } from "@/__tests__/__mocks__/mocks";
import UserCompletePresenter from "@/infra/adapters/presenters/UserPresenters/UserCompletePresenter";

describe("UserCompletePresenter", () => {
  describe("output", () => {
    it("Should return an object containing id, username and access_level.", () => {
      const presenter = new UserCompletePresenter();

      expect(presenter.output(dbUserExample)).toEqual({
        id: dbUserExample._id,
        username: dbUserExample.username,
        access_level: dbUserExample.access_level,
        contact: dbUserExample.contact,
        personal_data: dbUserExample.personal_data,
        status: dbUserExample.status,
      });
    });
  });
});
