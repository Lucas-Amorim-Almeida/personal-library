import UpdateBookInCollectionInputBoundary from "@/domain/application/Collection/UpdateBookInCollection/UpdateBookInCollectionInputBoundary";
import FieldRequiredError from "@/domain/application/Errors/FieldRequiredError";
import InvalidFieldError from "@/domain/application/Errors/InvalidFieldError";
import ReadingStatus from "@/domain/core/ReadingStatus";

const inputParams = {
  id: "id-collection000001",
  update_fields: {
    books_collection: [
      {
        book_id: "id-book00001",
        operation: "insert",
      },
      {
        book_id: "id-book00002",
        operation: "remove",
      },
      {
        book_id: "id-book00003",
        operation: "update",
        status: "LEITURA COMPLETA",
      },
    ],
  },
};

describe("UpdateBookInCollectionInputBoundary", () => {
  describe("Constructor", () => {
    it("Should be an instance of UpdateBookInCollectionInputBoundary", () => {
      expect(
        new UpdateBookInCollectionInputBoundary(inputParams),
      ).toBeInstanceOf(UpdateBookInCollectionInputBoundary);
    });

    it("Should throws an error of Id is required.", () => {
      expect(
        () =>
          new UpdateBookInCollectionInputBoundary({
            id: "",
            update_fields: {
              books_collection: [
                {
                  book_id: "",
                  operation: "insert",
                },
              ],
            },
          }),
      ).toThrow(FieldRequiredError);
    });

    it("Should throws an error of book_id is required.", () => {
      expect(
        () =>
          new UpdateBookInCollectionInputBoundary({
            id: "id-collection000001",
            update_fields: {
              books_collection: [
                {
                  book_id: "",
                  operation: "insert",
                },
              ],
            },
          }),
      ).toThrow(FieldRequiredError);
    });

    it("Should throws an error of operation is not valid.", () => {
      expect(
        () =>
          new UpdateBookInCollectionInputBoundary({
            id: "id-collection000001",
            update_fields: {
              books_collection: [
                {
                  book_id: "id-book00002",
                  operation: "invalid",
                },
              ],
            },
          }),
      ).toThrow(InvalidFieldError);
    });

    it("Should throws an error of Status is not valid.", () => {
      expect(
        () =>
          new UpdateBookInCollectionInputBoundary({
            id: "id-collection000001",
            update_fields: {
              books_collection: [
                {
                  book_id: "id-book00003",
                  operation: "update",
                  status: "invalid",
                },
              ],
            },
          }),
      ).toThrow(InvalidFieldError);
    });
  });

  describe("get", () => {
    it("Should return an object with formated input params.", () => {
      const input = new UpdateBookInCollectionInputBoundary(inputParams);

      expect(input.get()).toEqual({
        id: "id-collection000001",
        books_collection: [
          {
            book_id: "id-book00001",
            operation: "insert",
          },
          {
            book_id: "id-book00002",
            operation: "remove",
          },
          {
            book_id: "id-book00003",
            operation: "update",
            status: ReadingStatus.COMPLETED,
          },
        ],
      });
    });
  });
});
