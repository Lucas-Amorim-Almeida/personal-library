import { DBOutputUserData } from "@/domain/application/@types/UserTypes";
import Cryptography from "@/domain/application/accessories/Cryptography";
import Repository from "@/domain/core/Repository";

export const repositoryMock: jest.Mocked<Repository> = {
  getAll: jest.fn(),
  getMany: jest.fn(),
  getOne: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

export const encrypterMock: jest.Mocked<Cryptography> = {
  compare: jest.fn(),
  encrypt: jest.fn(),
  setPlainText: jest.fn(),
};

export const dbContactExample = {
  email: "jonh_doe@example.com",
  phone: ["+5511911111111", "+5522922222222"],
  created_at: new Date(2020, 2, 22),
  updated_at: new Date(2022, 2, 22),
};

export const dbPersonalDataExample = {
  name: "John Doe",
  birth_date: new Date(2001, 1, 11),
  created_at: new Date(2020, 2, 22),
  updated_at: new Date(2022, 2, 22),
};

export const dbUserExample: DBOutputUserData = {
  id: "id-0001",
  username: "john_doe",
  password: "1234",
  access_level: "COMMON",
  status: "ATIVO",
  contact: dbContactExample,
  personal_data: dbPersonalDataExample,
  created_at: new Date(2020, 2, 22),
  updated_at: new Date(2022, 2, 22),
};

export const userInputExample = {
  username: "john_doe",
  password: "12345678",
  access_level: "COMMON",
  contact: {
    email: "jonh_doe@example.com",
    phone: ["+5511911111111", "+5522922222222"],
  },
  personal_data: {
    name: "John Doe",
    birth_date: new Date(2001, 1, 11),
  },
};
