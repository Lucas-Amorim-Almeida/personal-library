import UpdateBookInCollectionInputBoundary from "@/application/Collection/UpdateBookInCollection/UpdateBookInCollectionInputBoundary";
import ReadingStatus from "@/core/ReadingStatus";

const inputParams = {
  id: "id-collection000001",
  collection: [
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
            collection: [
              {
                book_id: "",
                operation: "insert",
              },
            ],
          }),
      ).toThrow("Id is required.");
    });

    it("Should throws an error of book_id is required.", () => {
      expect(
        () =>
          new UpdateBookInCollectionInputBoundary({
            id: "id-collection000001",
            collection: [
              {
                book_id: "",
                operation: "insert",
              },
            ],
          }),
      ).toThrow("book_id is required.");
    });

    it("Should throws an error of operation is not valid.", () => {
      expect(
        () =>
          new UpdateBookInCollectionInputBoundary({
            id: "id-collection000001",
            collection: [
              {
                book_id: "id-book00002",
                operation: "invalid",
              },
            ],
          }),
      ).toThrow("Operation is not valid.");
    });

    it("Should throws an error of Status is not valid.", () => {
      expect(
        () =>
          new UpdateBookInCollectionInputBoundary({
            id: "id-collection000001",
            collection: [
              {
                book_id: "id-book00003",
                operation: "update",
                status: "invalid",
              },
            ],
          }),
      ).toThrow("Reading status is not valid.");
    });
  });

  describe("get", () => {
    it("Should return an object with formated input params.", () => {
      const input = new UpdateBookInCollectionInputBoundary(inputParams);

      expect(input.get()).toEqual({
        id: "id-collection000001",
        collection: [
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
