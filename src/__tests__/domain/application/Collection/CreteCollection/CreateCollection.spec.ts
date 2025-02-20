import { dbUserExample, repositoryMock } from "@/__tests__/__mocks__/mocks";
import { ColletionInputData } from "@/domain/application/@types/CollectionTypes";
import CreateCollection from "@/domain/application/Collection/CreteCollection/CreateCollection";
import CollectionOutputBoundary from "@/domain/application/Collection/CollectionOutputBoundary";
import InputBoundary from "@/domain/application/InputBoundary";
import Repository from "@/domain/core/Repository";
import Collection from "@/domain/core/Collection";
import { dbBookExample } from "@/__tests__/__mocks__/bookMock";
import { dbCollectionExample } from "@/__tests__/__mocks__/collectionMock";
import InternalError from "@/domain/application/Errors/InternalError";
import EntityNotFoundError from "@/domain/application/Errors/EntityNotFoundError";

const books = [{ book_id: "ID-book0001", status: "Em leitura" }];

const inputMock: jest.Mocked<InputBoundary<ColletionInputData>> = {
  get: jest.fn(() => ({
    title: "Livros de Tolkien",
    description: "Coleção com os livros de Tolkien.",
    visibility: "private",
    books_collection: books,
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
    it("Should return an instance of CollectionOutputBoundary", async () => {
      userRepository.getOne.mockResolvedValue(dbUserExample);
      bookRepository.getOne.mockResolvedValue(dbBookExample);
      collectionRepository.save.mockResolvedValue(dbCollectionExample);

      const createCollection = new CreateCollection(
        userRepository,
        bookRepository,
        collectionRepository,
      );
      await expect(createCollection.execute(inputMock)).resolves.toBeInstanceOf(
        Array,
      );
      const [response] = await createCollection.execute(inputMock);

      await expect(response).toBeInstanceOf(CollectionOutputBoundary);
      expect(userRepository.getOne).toHaveBeenCalledWith({
        _id: "id-00001",
      });
      expect(bookRepository.getOne).toHaveBeenCalledWith({
        _id: books[0].book_id,
      });
      expect(collectionRepository.save).toHaveBeenCalledWith(
        expect.any(Collection),
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

      try {
        await createCollection.execute(inputMock);
      } catch (error) {
        expect(userRepository.getOne).toHaveBeenCalledWith({
          _id: "id-00001",
        });
        expect(bookRepository.getOne).toHaveBeenCalledWith({
          _id: books[0].book_id,
        });
        expect(collectionRepository.save).toHaveBeenCalledWith(
          expect.any(Collection),
        );
        expect(error).toEqual(new InternalError());
      }
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

      try {
        await createCollection.execute(inputMock);
      } catch (error) {
        expect(otherUserRepo.getOne).toHaveBeenCalledWith({
          _id: "id-00001",
        });
        expect(bookRepository.getOne).toHaveBeenCalledWith({
          _id: books[0].book_id,
        });
        expect(error).toEqual(new EntityNotFoundError("Book"));
      }
    });

    it("Should throws an error of User not found.", async () => {
      userRepository.getOne.mockResolvedValue(null);
      const createCollection = new CreateCollection(
        userRepository,
        bookRepository,
        collectionRepository,
      );

      try {
        await createCollection.execute(inputMock);
      } catch (error) {
        expect(userRepository.getOne).toHaveBeenCalledWith({
          _id: "id-00001",
        });
        expect(error).toEqual(new EntityNotFoundError("User"));
      }
    });
  });
});
