import UpdateCollectionInfoInputBoundary from "@/domain/application/Collection/UpdateCollectionInfo/UpdateCollectionInfoInputBoundary";
import FieldRequiredError from "@/domain/application/Errors/FieldRequiredError";
import InvalidFieldError from "@/domain/application/Errors/InvalidFieldError";

const inputParams = {
  collection_id: "000001",
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
            collection_id: "",
            update_fields: {
              title: "Livros de Tolkien",
              description: "Coleção de livros de Tolkien.",
              visibility: "public",
            },
          }),
      ).toThrow(InvalidFieldError);
    });

    it("Should throws an error of At least update fields is required.", () => {
      expect(
        () =>
          new UpdateCollectionInfoInputBoundary({
            collection_id: "000001",
            update_fields: {},
          }),
      ).toThrow(FieldRequiredError);
    });

    it("Should throws an error of Visibility is not valid.", () => {
      try {
        new UpdateCollectionInfoInputBoundary({
          collection_id: "000001",
          update_fields: {
            title: "Livros de Tolkien",
            description: "Coleção de livros de Tolkien.",
            visibility: "invalid",
          },
        });
      } catch (error) {
        expect(error).toEqual(new InvalidFieldError("Visibility"));
      }
    });
  });

  describe("get", () => {
    it("Should return an object with collection id and update fields.", () => {
      const input = new UpdateCollectionInfoInputBoundary(inputParams);
      expect(input.get()).toEqual({
        collection_id: "000001",
        update_fields: {
          title: "Livros de Tolkien",
          description: "Coleção de livros de Tolkien.",
          visibility: "public" as "public" | "private",
        },
      });
    });
  });
});
