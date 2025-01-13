import { DBOutputUserData } from "@/application/@types/applicationTypes";
import Cryptography from "@/application/accessories/Cryptography";
import Repository from "@/core/Repository";

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

export const dbUserExample: DBOutputUserData = {
  id: "id-0001",
  username: "john_doe",
  password: "1234",
  status: "ATIVO",
  access_level: "COMMON",
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

export const dbContactExample = {
  id: "id-123456",
  email: "jonh_doe@example.com",
  phone: ["+5511911111111", "+5522922222222"],
  created_at: new Date(2020, 2, 22),
  updated_at: new Date(2022, 2, 22),
};

export const dbPersonalDataExample = {
  id: "id-123456",
  name: "John Doe",
  birth_date: new Date(2001, 1, 11),
  created_at: new Date(2020, 2, 22),
  updated_at: new Date(2022, 2, 22),
};

export const dbBookExample = {
  title: "O Senhor dos Anéis",
  author: ["J. R. R. Tolkien"],
  edition: "Coleção Nova Fronteira",
  publication_year: 1954,
  publisher: "Nova Fronteira",
  publication_location: "Rio de Janeiro",
  isbn: "9788520908190",
  volume: 1,
  genre: ["Fantasia", "Clássicos"],
  status: "Leitura completa",
  created_at: new Date(2020, 2, 20),
  updated_at: new Date(2022, 2, 22),
};
