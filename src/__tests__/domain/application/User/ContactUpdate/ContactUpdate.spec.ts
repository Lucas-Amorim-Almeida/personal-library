import { dbContactExample, repositoryMock } from "@/__tests__/__mocks__/mocks";
import ContactUpdate from "@/domain/application/User/ContactUpdate/ContactUpdate";
import ContactUpdateOutputBoundary from "@/domain/application/User/ContactUpdate/ContactUpdateOutputBoundary";
import InputBoundary from "@/domain/application/InputBoundary";
import Email from "@/domain/core/valueObjects/Email";
import Phone from "@/domain/core/valueObjects/Phone";
import FieldRequiredError from "@/domain/application/Errors/FieldRequiredError";
import EntityNotFoundError from "@/domain/application/Errors/EntityNotFoundError";
import InternalError from "@/domain/application/Errors/InternalError";

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

  const dbUserExample = {
    id: "id-0001",
    username: "john_doe",
    password: "1234",
    access_level: "COMMON",
    status: "ATIVO",
    contact: {
      email: "jonh_doe@example.com",
      phone: ["+5511911111111", "+5522922222222"],
      created_at: new Date(2020, 2, 22),
      updated_at: new Date(2022, 2, 22),
    },
    personal_data: {
      name: "John Doe",
      birth_date: new Date(2001, 1, 11),
      created_at: new Date(2020, 2, 22),
      updated_at: new Date(2022, 2, 22),
    },
    created_at: new Date(2020, 2, 22),
    updated_at: new Date(2022, 2, 22),
  };

  describe("execute", () => {
    it("Should be an instance of OutputBoundary data changed.", async () => {
      repositoryMock.getOne.mockResolvedValue(dbUserExample);

      repositoryMock.update.mockResolvedValue({
        id: "id-0001",
        username: "john_doe",
        password: "1234",
        access_level: "COMMON",
        status: "ATIVO",
        contact: {
          email: "jonh_doe_22@example.com",
          phone: ["+5511900000000"],
          created_at: new Date(2020, 2, 22),
          updated_at: new Date(2022, 2, 22),
        },
        personal_data: {
          name: "John Doe",
          birth_date: new Date(2001, 1, 11),
          created_at: new Date(2020, 2, 22),
          updated_at: new Date(2022, 2, 22),
        },
        created_at: new Date(2020, 2, 22),
        updated_at: new Date(2022, 2, 22),
      });

      const contactUpdater = new ContactUpdate(repositoryMock);

      expect(contactUpdater.execute(inputBoundary)).resolves.toBeInstanceOf(
        Array,
      );

      const [output] = await contactUpdater.execute(inputBoundary);
      expect(output).toBeInstanceOf(ContactUpdateOutputBoundary);
      expect(output.get().email).toBe("jonh_doe_22@example.com");
      expect(output.get().phone).toEqual(["+5511900000000"]);

      expect(repositoryMock.getOne).toHaveBeenCalledWith({
        _id: "id-000001",
      });
      expect(repositoryMock.update).toHaveBeenCalledWith({
        query: { _id: "id-000001" },
        update_fields: {
          contact: {
            email: "jonh_doe_22@example.com",
            phone: ["+5511900000000"],
          },
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
        FieldRequiredError,
      );
    });
    it("Should throws an erro of User not found.", async () => {
      const contactUpdater = new ContactUpdate(repositoryMock);

      repositoryMock.getOne.mockResolvedValue(null);

      expect(contactUpdater.execute(inputBoundary)).rejects.toThrow(
        EntityNotFoundError,
      );
      expect(repositoryMock.getOne).toHaveBeenCalledWith({
        _id: "id-000001",
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
          _id: "id-000001",
        });
        expect(repositoryMock.update).toHaveBeenCalledWith({
          query: { _id: "id-000001" },
          update_fields: {
            contact: {
              email: "jonh_doe_22@example.com",
              phone: ["+5511900000000"],
            },
          },
        });
        expect(error).toEqual(new InternalError());
      }
    });
  });
});
