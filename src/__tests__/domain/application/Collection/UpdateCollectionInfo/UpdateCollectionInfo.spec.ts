import { dbCollectionExample } from "@/__tests__/__mocks__/collectionMock";
import { repositoryMock } from "@/__tests__/__mocks__/mocks";
import { InputCollectionInfoUpdate } from "@/domain/application/@types/CollectionTypes";
import CollectionOutputBoundary from "@/domain/application/Collection/CollectionOutputBoundary";
import UpdateCollectionInfo from "@/domain/application/Collection/UpdateCollectionInfo/UpdateCollectionInfo";
import InputBoundary from "@/domain/application/InputBoundary";

const inputParams: InputCollectionInfoUpdate = {
  colletion_id: "000001",
  update_fields: {
    title: "Livros de Tolkien",
    description: "Coleção de livros de Tolkien.",
    visibility: "public",
  },
};

const inputMock: jest.Mocked<InputBoundary<InputCollectionInfoUpdate>> = {
  get: jest.fn(() => inputParams),
};

describe("UpdateCollectionInfo", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Constructor", () => {
    it("Should be an instance of UpdateCollectionInfo", () => {
      expect(new UpdateCollectionInfo(repositoryMock)).toBeInstanceOf(
        UpdateCollectionInfo,
      );
    });
  });

  describe("execute", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("Should return an instance of CollectionOutputBoundary.", async () => {
      repositoryMock.getOne.mockResolvedValue(dbCollectionExample);
      repositoryMock.update.mockResolvedValue({
        id: "000001",
        title: inputParams.update_fields.title,
        description: inputParams.update_fields.description,
        visibility: inputParams.update_fields.visibility,
        collection: [
          {
            book_id: "ID-book0001",
            title: "O Senhor dos aneis",
            author: ["Tolkien"],
            status: "Em leitura",
          },
        ],
        owner: "id-00001",
      });

      const update = new UpdateCollectionInfo(repositoryMock);

      expect(update.execute(inputMock)).resolves.toBeInstanceOf(Array);
      const [collectionUpdated] = await update.execute(inputMock);
      expect(collectionUpdated).toBeInstanceOf(CollectionOutputBoundary);
      expect(repositoryMock.getOne).toHaveBeenCalledWith({
        id: inputParams.colletion_id,
      });
      expect(repositoryMock.update).toHaveBeenCalledWith({
        id: inputParams.colletion_id,
        update_fields: inputParams.update_fields,
      });
    });

    it("Should throws an error of Collection not found.", async () => {
      repositoryMock.getOne.mockResolvedValue(null);

      const update = new UpdateCollectionInfo(repositoryMock);

      try {
        await update.execute(inputMock);
      } catch (error) {
        expect(repositoryMock.getOne).toHaveBeenCalledWith({
          id: inputParams.colletion_id,
        });
        expect(error).toEqual(new Error("Collection not found."));
      }
    });

    it("Should throws an error of An internal server error occurred.", async () => {
      repositoryMock.getOne.mockResolvedValue(dbCollectionExample);
      repositoryMock.update.mockResolvedValue(null);

      const update = new UpdateCollectionInfo(repositoryMock);

      try {
        await update.execute(inputMock);
      } catch (error) {
        expect(repositoryMock.getOne).toHaveBeenCalledWith({
          id: inputParams.colletion_id,
        });
        expect(repositoryMock.update).toHaveBeenCalledWith({
          id: inputParams.colletion_id,
          update_fields: inputParams.update_fields,
        });
        expect(error).toEqual(new Error("An internal server error occurred."));
      }
    });
  });
});
