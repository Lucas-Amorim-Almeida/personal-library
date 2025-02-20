import { dbBookInsertExample } from "@/__tests__/__mocks__/bookMock";
import { dbCollectionExample2 } from "@/__tests__/__mocks__/collectionMock";
import { repositoryMock } from "@/__tests__/__mocks__/mocks";
import { CollectionInput } from "@/domain/application/@types/CollectionTypes";
import CollectionOutputBoundary from "@/domain/application/Collection/CollectionOutputBoundary";
import UpdateBookInCollection from "@/domain/application/Collection/UpdateBookInCollection/UpdateBookInCollection";
import InternalError from "@/domain/application/Errors/InternalError";
import EntityNotFoundError from "@/domain/application/Errors/EntityNotFoundError";
import InputBoundary from "@/domain/application/InputBoundary";
import ReadingStatus from "@/domain/core/ReadingStatus";
import Repository from "@/domain/core/Repository";

const inputParams: CollectionInput = {
  id: "000002",
  books_collection: [
    {
      book_id: "id-00005",
      operation: "insert",
      status: ReadingStatus.IN_PROGRESS,
    },
    {
      book_id: "id-00003",
      operation: "remove",
    },
    {
      book_id: "id-00002",
      operation: "update",
      status: ReadingStatus.COMPLETED,
    },
  ],
};

const collectionUpdatedMock = {
  id: "000002",
  title: "Coleção de Fantasia Épica",
  description: "Coleção com obras clássicas de fantasia épica.",
  visibility: "public",
  books_collection: [
    {
      book_id: "id-00002",
      title: "O Hobbit",
      author: ["J. R. R. Tolkien"],
      status: "LEITURA COMPLETA",
    },
    {
      book_id: "id-00004",
      title: "A Saga da Fundação",
      author: ["Isaac Asimov"],
      status: "EM LEITURA",
    },
    {
      book_id: "id-00005",
      title: "Duna",
      author: ["Frank Herbert"],
      status: "EM LEITURA",
    },
  ],
  owner: "id-00002",
};

const inputMock: jest.Mocked<InputBoundary<CollectionInput>> = {
  get: jest.fn(() => inputParams),
};
const bookRepoMock = repositoryMock;

describe("UpdateBookInCollection", () => {
  describe("Constructor", () => {
    it("Should be an instance of UpdateBookInCollection", () => {
      //repositoryMock é equivalente ao repositório de collections
      expect(
        new UpdateBookInCollection(repositoryMock, bookRepoMock),
      ).toBeInstanceOf(UpdateBookInCollection);
    });
  });

  describe("execute", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("Should return an array composing by instance of CollectionOutputBoundary", async () => {
      const collectionRepoyMock: jest.Mocked<Repository> = {
        getAll: jest.fn(),
        getMany: jest.fn(),
        getOne: jest.fn(),
        save: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      };

      collectionRepoyMock.getOne.mockResolvedValue(dbCollectionExample2);
      bookRepoMock.getOne.mockResolvedValue(dbBookInsertExample);
      collectionRepoyMock.update.mockResolvedValue(collectionUpdatedMock);

      const updateCollection = new UpdateBookInCollection(
        collectionRepoyMock,
        bookRepoMock,
      );

      expect(updateCollection.execute(inputMock)).resolves.toBeInstanceOf(
        Array,
      );

      const [response] = await updateCollection.execute(inputMock);
      expect(response).toBeInstanceOf(CollectionOutputBoundary);
      expect(collectionRepoyMock.getOne).toHaveBeenCalledWith({
        _id: inputParams.id,
      });
      expect(bookRepoMock.getOne).toHaveBeenCalledWith({ _id: "id-00005" });
      expect(collectionRepoyMock.update).toHaveBeenCalledWith({
        id: inputParams.id,
        update: {
          toInsert: [
            {
              book_id: "id-00005",
              title: "Duna",
              author: ["Frank Herbert"],
              status: ReadingStatus.IN_PROGRESS,
            },
          ],
          toUpdate: [
            {
              book_id: "id-00002",
              status: ReadingStatus.COMPLETED,
            },
          ],
          toRemove: ["id-00003"],
        },
      });
    });

    it("Should throws an error of Collection not found.", async () => {
      repositoryMock.getOne.mockResolvedValue(null);

      const updateCollection = new UpdateBookInCollection(
        repositoryMock,
        bookRepoMock,
      );
      try {
        await updateCollection.execute(inputMock);
      } catch (error) {
        expect(repositoryMock.getOne).toHaveBeenLastCalledWith({
          _id: inputParams.id,
        });
        expect(error).toEqual(new EntityNotFoundError("Collection"));
      }
    });

    it("Should throws an error of Book not found.", async () => {
      const collectionRepoMock: jest.Mocked<Repository> = {
        getAll: jest.fn(),
        getMany: jest.fn(),
        getOne: jest.fn(),
        save: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      };

      const inputMock2: jest.Mocked<InputBoundary<CollectionInput>> = {
        get: jest.fn(() => inputParams),
      };
      collectionRepoMock.getOne.mockResolvedValue(dbCollectionExample2);
      bookRepoMock.getOne.mockResolvedValue(null);

      const updateCollection = new UpdateBookInCollection(
        collectionRepoMock,
        bookRepoMock,
      );
      try {
        await updateCollection.execute(inputMock2);
      } catch (error) {
        expect(collectionRepoMock.getOne).toHaveBeenLastCalledWith({
          _id: inputParams.id,
        });
        expect(bookRepoMock.getOne).toHaveBeenCalledWith({
          _id: "id-00005",
        });
        expect(error).toEqual(new EntityNotFoundError("Book"));
      }
    });

    it("Should throws an error of An internal server error occurred.", async () => {
      const collectionRepoMock: jest.Mocked<Repository> = {
        getAll: jest.fn(),
        getMany: jest.fn(),
        getOne: jest.fn(),
        save: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      };

      collectionRepoMock.getOne.mockResolvedValue(dbCollectionExample2);
      bookRepoMock.getOne.mockResolvedValue(dbBookInsertExample);
      collectionRepoMock.update.mockResolvedValue(null);

      const updateCollection = new UpdateBookInCollection(
        collectionRepoMock,
        bookRepoMock,
      );
      try {
        await updateCollection.execute(inputMock);
      } catch (error) {
        expect(collectionRepoMock.getOne).toHaveBeenLastCalledWith({
          _id: inputParams.id,
        });
        expect(bookRepoMock.getOne).toHaveBeenCalledWith({ _id: "id-00005" });
        expect(collectionRepoMock.update).toHaveBeenCalled();
        expect(error).toEqual(new InternalError());
      }
    });
  });
});
