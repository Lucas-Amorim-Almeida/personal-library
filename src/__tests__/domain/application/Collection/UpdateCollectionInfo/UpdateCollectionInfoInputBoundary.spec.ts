import UpdateCollectionInfoInputBoundary from "@/domain/application/Collection/UpdateCollectionInfo/UpdateCollectionInfoInputBoundary";

const inputParams = {
  colletion_id: "000001",
  update_fields: {
    title: "Livros de Tolkien",
    description: "Coleção de livros de Tolkien.",
    visibility: "public",
  },
};

describe("UpdateCollectionInfoInputBoundary", () => {
  describe("Constructor", () => {
    it("Should be an instance of UpdateCollectionInfoInputBoundary", () => {
      expect(new UpdateCollectionInfoInputBoundary(inputParams)).toBeInstanceOf(
        UpdateCollectionInfoInputBoundary,
      );
    });

    it("Should throws an error of Collection id is not valid.", () => {
      expect(
        () =>
          new UpdateCollectionInfoInputBoundary({
            colletion_id: "",
            update_fields: {
              title: "Livros de Tolkien",
              description: "Coleção de livros de Tolkien.",
              visibility: "public",
            },
          }),
      ).toThrow("Collection id is not valid.");
    });

    it("Should throws an error of At least update fields is required.", () => {
      expect(
        () =>
          new UpdateCollectionInfoInputBoundary({
            colletion_id: "000001",
            update_fields: {},
          }),
      ).toThrow("At least update fields is required.");
    });

    it("Should throws an error of Visibility is not valid.", () => {
      expect(
        () =>
          new UpdateCollectionInfoInputBoundary({
            colletion_id: "000001",
            update_fields: {
              title: "Livros de Tolkien",
              description: "Coleção de livros de Tolkien.",
              visibility: "invalid",
            },
          }),
      ).toThrow("Visibility is not valid.");
    });
  });

  describe("get", () => {
    it("Should return an object with collection id and update fields.", () => {
      const input = new UpdateCollectionInfoInputBoundary(inputParams);
      expect(input.get()).toEqual({
        colletion_id: "000001",
        update_fields: {
          title: "Livros de Tolkien",
          description: "Coleção de livros de Tolkien.",
          visibility: "public" as "public" | "private",
        },
      });
    });
  });
});
