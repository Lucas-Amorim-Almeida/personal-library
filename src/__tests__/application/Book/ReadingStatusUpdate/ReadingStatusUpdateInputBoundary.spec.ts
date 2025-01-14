import ReadingStatusUpdateInputBoundary from "@/application/Book/ReadingStatusUpdate/ReadingStatusUpdateInputBoundary";
import ReadingStatus from "@/core/ReadingStatus";

describe("ReadingStatusUpdateInputBoundary", () => {
  describe("Constructor", () => {
    it("Should be an instance of ReadingStatusUpdateInputBoundary", () => {
      const inputParams = {
        id: "id-00001",
        status: "LEITURA COMPLETA",
      };

      expect(new ReadingStatusUpdateInputBoundary(inputParams)).toBeInstanceOf(
        ReadingStatusUpdateInputBoundary,
      );
    });

    it("Should throws an error of Reading status is not valid.", () => {
      const inputParams = {
        id: "id-00001",
        status: "invalido",
      };

      expect(() => new ReadingStatusUpdateInputBoundary(inputParams)).toThrow(
        "Reading status is not valid.",
      );
    });
  });

  describe("get", () => {
    it("Should return an object with book id and reading status", () => {
      const inputParams = {
        id: "id-00001",
        status: "LEITURA COMPLETA",
      };

      const input = new ReadingStatusUpdateInputBoundary(inputParams);

      expect(input.get()).toEqual({
        id: inputParams.id,
        status: ReadingStatus.COMPLETED,
      });
    });
  });
});
