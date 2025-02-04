import { dbContactExample, repositoryMock } from "@/__tests__/__mocks__/mocks";
import ContactUpdate from "@/domain/application/User/ContactUpdate/ContactUpdate";
import ContactUpdateOutputBoundary from "@/domain/application/User/ContactUpdate/ContactUpdateOutputBoundary";
import InputBoundary from "@/domain/application/InputBoundary";
import Email from "@/domain/core/valueObjects/Email";
import Phone from "@/domain/core/valueObjects/Phone";

const inputParams = {
  user_id: "id-000001",
  email: new Email("jonh_doe_22@example.com"),
  phone: [new Phone("+5511900000000")],
};
const inputBoundary: jest.Mocked<
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
      repositoryMock.getOne.mockResolvedValue(dbContactExample);
      repositoryMock.update.mockResolvedValue({
        user_id: "id-000001",
        email: "jonh_doe_22@example.com",
        phone: ["+5511900000000"],
        created_at: new Date(2020, 2, 22),
        updated_at: new Date(2022, 2, 22),
      });

      const contactUpdater = new ContactUpdate(repositoryMock);

      expect(contactUpdater.execute(inputBoundary)).resolves.toBeInstanceOf(
        Array,
      );

      const [output] = await contactUpdater.execute(inputBoundary);
      expect(output).toBeInstanceOf(ContactUpdateOutputBoundary);
      expect(output.get().get().email.get()).toBe("jonh_doe_22@example.com");
      expect(output.get().get().phone).toEqual(inputParams.phone);

      expect(repositoryMock.getOne).toHaveBeenCalledWith({
        id: "id-000001",
      });
      expect(repositoryMock.update).toHaveBeenCalledWith({
        query: { id: "id-000001" },
        update_fields: {
          email: new Email("jonh_doe_22@example.com"),
          phone: [new Phone("+5511900000000")],
        },
      });
    });

    it("Should throws an erro of Email or Phone is required.", async () => {
      const contactUpdater = new ContactUpdate(repositoryMock);

      const inputBoundaryOnlyId: jest.Mocked<
        InputBoundary<{ user_id: string; email?: Email; phone?: Phone[] }>
      > = {
        get: jest.fn(() => ({ user_id: "id-000001" })),
      };

      expect(contactUpdater.execute(inputBoundaryOnlyId)).rejects.toThrow(
        "Email or Phone is required.",
      );
    });
    it("Should throws an erro of User not found.", async () => {
      const contactUpdater = new ContactUpdate(repositoryMock);

      repositoryMock.getOne.mockResolvedValue(null);

      expect(contactUpdater.execute(inputBoundary)).rejects.toThrow(
        "User or Contact not found.",
      );
      expect(repositoryMock.getOne).toHaveBeenCalledWith({
        id: "id-000001",
      });
    });

    it("Should throws an erro of An internal server error occurred.", async () => {
      const contactUpdater = new ContactUpdate(repositoryMock);

      repositoryMock.getOne.mockResolvedValue(dbContactExample);
      repositoryMock.update.mockResolvedValue(null);

      try {
        await contactUpdater.execute(inputBoundary);
      } catch (error) {
        expect(repositoryMock.getOne).toHaveBeenCalledWith({
          id: "id-000001",
        });
        expect(repositoryMock.update).toHaveBeenCalledWith({
          query: { id: "id-000001" },
          update_fields: {
            email: new Email("jonh_doe_22@example.com"),
            phone: [new Phone("+5511900000000")],
          },
        });
        expect(error).toEqual(new Error("An internal server error occurred."));
      }
    });
  });
});
