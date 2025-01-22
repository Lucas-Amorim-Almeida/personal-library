import { CollectionParamsType } from "@/core/@types/types";
import Book from "@/core/Book";
import BookGenre from "@/core/BookGenre";
import Collection from "@/core/Collection";
import ReadingStatus from "@/core/ReadingStatus";

const book: Book = new Book({
  title: "O Senhor dos Anéis: A Sociedade do Anel",
  author: ["J.R.R. Tolkien"],
  edition: "1ª Edição",
  publication_year: 1954,
  publisher: "Allen & Unwin",
  publication_location: "Londres",
  isbn: "978-3-16-148410-0",
  volume: 1,
  genre: [BookGenre.FANTASY, BookGenre.ACTION_ADVENTURE],
});

describe("Collection", () => {
  const params: CollectionParamsType = {
    title: "Lord of the rings",
    description: "Livros da franquia de Tolkien",
    visibility: "public",
    collection: [{ book, status: ReadingStatus.PENDING }],
    owner: "id-00001",
  };

  describe("Constructor", () => {
    it("Should be an instance of Collection", () => {
      expect(new Collection(params)).toBeInstanceOf(Collection);
    });
  });

  describe("get", () => {
    it("Should return an object like CollectionParamsType", () => {
      const collection = new Collection(params);

      expect(collection.get()).toEqual({
        title: params.title,
        description: params.description,
        visibility: "public",
        collection: params.collection,
        owner: "id-00001",
      });
    });
  });

  describe("setID", () => {
    it("Should change id property.", () => {
      const collection = new Collection(params);

      collection.setId("id-00001");
      expect(collection.get().id).toEqual("id-00001");
    });

    it("Should throws an error of ID is not valid.", () => {
      const collection = new Collection(params);

      expect(() => collection.setId("")).toThrow("ID is not valid.");
    });
  });

  describe("getID", () => {
    it("Should return undefined.", () => {
      const collection = new Collection(params);

      expect(collection.getId()).toBeUndefined();
    });

    it("Should return undefined.", () => {
      const collection = new Collection(params);

      collection.setId("id-00001");
      expect(collection.getId()).toEqual("id-00001");
    });
  });

  describe("getVisibility", () => {
    it("Should return 'public'.", () => {
      const collection = new Collection(params);

      expect(collection.getVisibility()).toEqual("public");
    });
  });
});
