import {
  dbBookExample,
  dbCollectionExample,
  dbUserExample,
  repositoryMock,
} from "@/__tests__/__mocks__/mocks";
import { ColletionInputData } from "@/application/@types/applicationTypes";
import CreateCollection from "@/application/Collection/CreteCollection/CreateCollection";
import CreateCollectionOutputBoundary from "@/application/Collection/CreteCollection/CreateCollectionOutputBoundary";
import InputBoundary from "@/application/InputBoundary";
import Repository from "@/core/Repository";

const books = ["ID-book0001"];

const inputMock: jest.Mocked<InputBoundary<ColletionInputData>> = {
  get: jest.fn(() => ({
    title: "Livros de Tolkien",
    description: "Coleção com os livros de Tolkien.",
    visibility: "private",
    collection: books,
    owner: "id-00001",
  })),
};

const userRepository = repositoryMock;
const bookRepository = repositoryMock;
const collectionRepository = repositoryMock;

describe("CreateCollection", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe("Constructor", () => {
    it("Should be an instance of CreateCollection", () => {
      expect(
        new CreateCollection(
          userRepository,
          bookRepository,
          collectionRepository,
        ),
      ).toBeInstanceOf(CreateCollection);
    });
  });
  describe("execute", () => {
    it("Should return an instance of CreateCollectionOutputBoundary", async () => {
      userRepository.getOne.mockResolvedValue(dbUserExample);
      bookRepository.getOne.mockResolvedValue(dbBookExample);
      collectionRepository.save.mockResolvedValue(dbCollectionExample);

      const createCollection = new CreateCollection(
        userRepository,
        bookRepository,
        collectionRepository,
      );
      await expect(createCollection.execute(inputMock)).resolves.toBeInstanceOf(
        CreateCollectionOutputBoundary,
      );
    });

    it("Should throws an error of An internal server error occurred.", async () => {
      userRepository.getOne.mockResolvedValue(dbUserExample);
      bookRepository.getOne.mockResolvedValue(dbBookExample);
      collectionRepository.save.mockResolvedValue(null);

      const createCollection = new CreateCollection(
        userRepository,
        bookRepository,
        collectionRepository,
      );
      expect(createCollection.execute(inputMock)).rejects.toThrow(
        "An internal server error occurred.",
      );
    });

    it("Should throws an error of Book not found.", async () => {
      //o jest estava apresentando problemas com o reuso do userRepository neste teste
      const otherUserRepo: jest.Mocked<Repository> = {
        delete: jest.fn(),
        getAll: jest.fn(),
        getMany: jest.fn(),
        update: jest.fn(),
        getOne: jest.fn(),
        save: jest.fn(),
      };

      otherUserRepo.getOne.mockResolvedValue(dbUserExample);
      bookRepository.getOne.mockResolvedValue(null);

      const createCollection = new CreateCollection(
        otherUserRepo,
        bookRepository,
        collectionRepository,
      );
      expect(createCollection.execute(inputMock)).rejects.toThrow(
        "Book not found.",
      );
    });

    it("Should throws an error of User not found.", async () => {
      userRepository.getOne.mockResolvedValue(null);
      const createCollection = new CreateCollection(
        userRepository,
        bookRepository,
        collectionRepository,
      );
      expect(createCollection.execute(inputMock)).rejects.toThrow(
        "User not found.",
      );
    });
  });
});
