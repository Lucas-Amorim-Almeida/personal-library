import { dbContactExample, repositoryMock } from "@/__tests__/__mocks__/mocks";
import ContactUpdate from "@/application/User/ContactUpdate/ContactUpdate";
import ContactUpdateOutputBoundary from "@/application/User/ContactUpdate/ContactUpdateOutputBoundary";
import InputBoundary from "@/application/InputBoundary";
import Email from "@/core/valueObjects/Email";
import Phone from "@/core/valueObjects/Phone";

const inputParams = {
  user_id: "id-000001",
  email: new Email("jonh_doe_22@example.com"),
  phone: [new Phone("+5511900000000")],
};
const InputBoundary: jest.Mocked<
  InputBoundary<{ user_id: string; email?: Email; phone?: Phone[] }>
> = {
  get: jest.fn(() => inputParams),
};

describe("ContactUpdate", () => {
  describe("Constructor", () => {
    it("Should be an instance of ContactUpdate", () => {
      expect(new ContactUpdate(repositoryMock)).toBeInstanceOf(ContactUpdate);
    });
  });

  describe("execute", () => {
    it("Should be an instance of OutputBoundary data changed.", async () => {
      const contactUpdater = new ContactUpdate(repositoryMock);

      repositoryMock.getOne.mockResolvedValue(dbContactExample);
      repositoryMock.update.mockResolvedValue({
        user_id: "id-000001",
        email: "jonh_doe_22@example.com",
        phone: ["+5511900000000"],
        created_at: new Date(2020, 2, 22),
        updated_at: new Date(2022, 2, 22),
      });

      expect(contactUpdater.execute(InputBoundary)).resolves.toBeInstanceOf(
        ContactUpdateOutputBoundary,
      );

      const output = await contactUpdater.execute(InputBoundary);
      expect(output.get().get().email.get()).toBe("jonh_doe_22@example.com");
      expect(output.get().get().phone).toEqual(inputParams.phone);
    });

    it("Should throws an erro of Email or Phone is required.", async () => {
      const contactUpdater = new ContactUpdate(repositoryMock);

      const InputBoundaryOnlyId: jest.Mocked<
        InputBoundary<{ user_id: string; email?: Email; phone?: Phone[] }>
      > = {
        get: jest.fn(() => ({ user_id: "id-000001" })),
      };

      expect(contactUpdater.execute(InputBoundaryOnlyId)).rejects.toThrow(
        "Email or Phone is required.",
      );
    });
    it("Should throws an erro of User not found.", async () => {
      const contactUpdater = new ContactUpdate(repositoryMock);

      repositoryMock.getOne.mockResolvedValue(null);

      expect(contactUpdater.execute(InputBoundary)).rejects.toThrow(
        "User or Contact not found.",
      );
    });
    it("Should throws an erro of An internal server error occurred.", async () => {
      const contactUpdater = new ContactUpdate(repositoryMock);

      repositoryMock.getOne.mockResolvedValue(dbContactExample);
      repositoryMock.update.mockResolvedValue(null);

      expect(contactUpdater.execute(InputBoundary)).rejects.toThrow(
        "An internal server error occurred.",
      );
    });
  });
});
