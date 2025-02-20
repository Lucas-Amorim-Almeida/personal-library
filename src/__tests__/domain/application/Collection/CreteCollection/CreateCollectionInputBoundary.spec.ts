import CreateCollectionInputBoundary from "@/domain/application/Collection/CreteCollection/CreateCollectionInputBoundary";
import FieldRequiredError from "@/domain/application/Errors/FieldRequiredError";

describe("CreateCollectionInputBoundary", () => {
  describe("Constructor", () => {
    it("Should be an instance of CreateCollectionInputBoundary", () => {
      expect(
        new CreateCollectionInputBoundary({
          title: "Livros de Tolkien",
          description: "Coleção com os livros de Tolkien.",
          visibility: "private",
          books_collection: [
            { book_id: "ID-book0001", status: "em leitura" },
            { book_id: "ID-book0002", status: "em leitura" },
            { book_id: "ID-book0003", status: "em leitura" },
          ],
          user_id: "id-00001",
        }),
      ).toBeInstanceOf(CreateCollectionInputBoundary);
    });

    it("Should throws an error of Title is required.", () => {
      expect(
        () =>
          new CreateCollectionInputBoundary({
            title: "",
            description: "Coleção com os livros de Tolkien.",
            visibility: "private",
            books_collection: [
              { book_id: "ID-book0001", status: "em leitura" },
            ],
            user_id: "id-00001",
          }),
      ).toThrow(FieldRequiredError);
    });

    it("Should throws an error of empty collection.", () => {
      expect(
        () =>
          new CreateCollectionInputBoundary({
            title: "Livros de Tolkien",
            description: "Coleção com os livros de Tolkien.",
            visibility: "private",
            books_collection: [],
            user_id: "id-00001",
          }),
      ).toThrow(FieldRequiredError);
    });
  });

  describe("get", () => {
    it("Should return an object with collection details.", () => {
      const input = new CreateCollectionInputBoundary({
        title: "Livros de Tolkien",
        description: "Coleção com os livros de Tolkien.",
        visibility: "private",
        books_collection: [
          { book_id: "ID-book0001", status: "em leitura" },
          { book_id: "ID-book0002", status: "em leitura" },
          { book_id: "ID-book0003", status: "em leitura" },
        ],
        user_id: "id-00001",
      });

      expect(input.get()).toEqual({
        title: "Livros de Tolkien",
        description: "Coleção com os livros de Tolkien.",
        visibility: "private",
        books_collection: [
          { book_id: "ID-book0001", status: "em leitura" },
          { book_id: "ID-book0002", status: "em leitura" },
          { book_id: "ID-book0003", status: "em leitura" },
        ],
        owner: "id-00001",
      });
    });
  });
});
