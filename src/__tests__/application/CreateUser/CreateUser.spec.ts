import CreateUser from "@/application/CreateUser/CreateUser";
import CreateUserInputBoundary from "@/application/CreateUser/CreateUserInputBoundary";
import CreateUserOutputBoundary from "@/application/CreateUser/CreateUserOutputBoundary";
import { PersonalDataParamsType } from "@/core/@types/types";
import AccessLevel from "@/core/AccessLevel";
import UserRepository from "@/core/repositories/UserRepository";
import User from "@/core/User";

const repositoryMock: jest.Mocked<UserRepository> = {
  getOne: jest.fn(),
  getMany: jest.fn(),
  getAll: jest.fn(),
  save: jest.fn(),
};

describe("CreateUser", () => {
  describe("Constructor", () => {
    it("Should be an instance of CreateUser", () => {
      expect(new CreateUser(repositoryMock)).toBeInstanceOf(CreateUser);
    });
  });

  const contactData = {
    email: "jonh_doe@example.com",
    phone: ["+5511911111111", "+5522922222222"],
  };
  const personalDataInfo: PersonalDataParamsType = {
    name: "John Doe",
    birth_date: new Date(2001, 1, 11),
  };

  const inputData = {
    username: "jonh_doe",
    password: "1234",
    access_level: "ADMINISTRATOR",
    personal_data: personalDataInfo,
    contact: contactData,
  };
  const input = new CreateUserInputBoundary(inputData);

  let userCreater: CreateUser;
  beforeEach(() => {
    userCreater = new CreateUser(repositoryMock);
  });

  it("Should creates an user successfull", async () => {
    // O método findByUsername retorna null, indicando que o usuário não existe
    repositoryMock.getOne.mockResolvedValue(null);
    repositoryMock.save.mockResolvedValue({ id: "id-00001", ...input });

    const result = await userCreater.execute(input);

    const resultUserInstance = result.get();
    // Assert
    expect(result).toBeInstanceOf(CreateUserOutputBoundary);
    expect(result.get()).toBeInstanceOf(User);
    expect(resultUserInstance.get().username).toBe(inputData.username);
    expect(resultUserInstance.get().access_level).toBe(inputData.access_level);
    expect(resultUserInstance.get().id).toEqual(expect.any(String));
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
