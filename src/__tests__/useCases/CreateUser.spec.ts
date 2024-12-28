import {
  AdressParamsType,
  ContactParamsType,
  PersonalDataParamsType,
} from "@/entities/@types/types";
import AccessLevel from "@/entities/AccessLevel";
import Adress from "@/entities/Adress";
import Contact from "@/entities/Contact";
import PersonalData from "@/entities/PersonalData";
import Repository from "@/entities/Repository";
import User from "@/entities/User";
import CreateUser from "@/useCases/CreateUser";

const repositoryMock: jest.Mocked<Repository> = {
  getOne: jest.fn(),
  getMany: jest.fn(),
  getAll: jest.fn(),
  save: jest.fn(),
};

describe("CreateUser", () => {
  describe("Constructor", () => {
    it("Should be a instance of CreateUser", () => {
      expect(new CreateUser(repositoryMock)).toBeInstanceOf(CreateUser);
    });
  });

  const adressData: AdressParamsType = {
    street: "Rua X",
    number: "s/n",
    city: "São Paulo",
    state: "São Paulo",
    country: "Brasil",
    zip_code: "",
  };
  const contactData: ContactParamsType = {
    email: "jonh_doe@example.com",
    phone: ["(11) 9 1111-1111", "(22) 9 2222-2222"],
  };
  const personalDataInfo: PersonalDataParamsType = {
    name: "John Doe",
    cpf: "111.222.333-44",
    birth_date: new Date(2001, 1, 11),
  };

  const input = {
    username: "jonh_doe",
    password: "1234",
    access_level: AccessLevel.ADMINISTRATOR,
    personal_data: new PersonalData(personalDataInfo),
    contact: new Contact(contactData),
    adress: new Adress(adressData),
  };

  let userCreater: CreateUser;
  beforeEach(() => {
    userCreater = new CreateUser(repositoryMock);
  });

  it("Should creates an user successfull", async () => {
    // O método findByUsername retorna null, indicando que o usuário não existe
    repositoryMock.getOne.mockResolvedValue(null);
    repositoryMock.save.mockResolvedValue({ id: "id-00001", ...input });

    const result = await userCreater.execute(input);

    // Assert
    expect(result).toBeInstanceOf(User);
    expect(result.get().username).toBe(input.username);
    expect(result.get().access_level).toBe(input.access_level);
    expect(repositoryMock.save).toHaveBeenCalledWith(expect.any(User)); //verifica se o método foi chamado
  });

  it("Should throws an error in case of user already exists.", async () => {
    // Arrange
    const userInput = {
      username: "existing_user",
      password: "password",
      access_level: AccessLevel.COMMON,
    };

    // Mock para indicar que o usuário já existe
    const existingUser = new User(userInput);
    repositoryMock.getOne.mockResolvedValue(existingUser);

    // Act & Assert
    await expect(userCreater.execute(input)).rejects.toThrow(
      "User already registered.",
    );

    // Verifica se o método save não foi chamado
    expect(repositoryMock.save).not.toHaveBeenCalled();
  });

  it("Should throws an error in case cannot possible save in db.", async () => {
    repositoryMock.getOne.mockResolvedValue(null);
    repositoryMock.save.mockResolvedValue(null);

    // Act & Assert
    await expect(userCreater.execute(input)).rejects.toThrow(
      "An internal server error occurred.",
    );
  });
});
