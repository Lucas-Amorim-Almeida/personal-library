import CreateCollectionInputBoundary from "@/application/Collection/CreteCollection/CreateCollectionInputBoundary";

describe("CreateCollectionInputBoundary", () => {
  describe("Constructor", () => {
    it("Should be an instance of CreateCollectionInputBoundary", () => {
      expect(
        new CreateCollectionInputBoundary({
          title: "Livros de Tolkien",
          description: "Coleção com os livros de Tolkien.",
          visibility: "private",
          collection: ["ID-book0001", "ID-book0002", "ID-book0003"],
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
            collection: ["ID-book0001"],
            user_id: "id-00001",
          }),
      ).toThrow("Title is required.");
    });

    it("Should throws an error of empty collection.", () => {
      expect(
        () =>
          new CreateCollectionInputBoundary({
            title: "Livros de Tolkien",
            description: "Coleção com os livros de Tolkien.",
            visibility: "private",
            collection: [],
            user_id: "id-00001",
          }),
      ).toThrow("At least a book id is required.");
    });
  });

  describe("get", () => {
    it("Should return an object with collection details.", () => {
      const input = new CreateCollectionInputBoundary({
        title: "Livros de Tolkien",
        description: "Coleção com os livros de Tolkien.",
        visibility: "private",
        collection: ["ID-book0001", "ID-book0002", "ID-book0003"],
        user_id: "id-00001",
      });

      expect(input.get()).toEqual({
        title: "Livros de Tolkien",
        description: "Coleção com os livros de Tolkien.",
        visibility: "private",
        collection: ["ID-book0001", "ID-book0002", "ID-book0003"],
        owner: "id-00001",
      });
    });
  });
});
