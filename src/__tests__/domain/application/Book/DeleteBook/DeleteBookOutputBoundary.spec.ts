import { dbBookExample } from "@/__tests__/__mocks__/bookMock";
import { DBOutputBookData } from "@/domain/application/@types/BookTypes";

import DeleteBookOutputBoundary from "@/domain/application/Book/DeleteBook/DeleteBookOutputBoundary";

describe("DeleteBookOutputBoundary", () => {
  describe("Constructor", () => {
    it("Should be an instance of DeleteBookOutputBoundary", () => {
      expect(
        new DeleteBookOutputBoundary(dbBookExample as DBOutputBookData),
      ).toBeInstanceOf(DeleteBookOutputBoundary);
      expect(new DeleteBookOutputBoundary(null)).toBeInstanceOf(
        DeleteBookOutputBoundary,
      );
    });
  });
  describe("get", () => {
    it("Should return true", () => {
      //se o input for nulo, implica que o dado foi deletado com sucesso
      const output = new DeleteBookOutputBoundary(null);
      expect(output.get()).toBe(true);
    });

    it("Should return false", () => {
      //se o input for não-nulo, significa que o dado ainda persiste no banco, portanto não foi deletado
      const output = new DeleteBookOutputBoundary(
        dbBookExample as DBOutputBookData,
      );
      expect(output.get()).toBe(false);
    });
  });
});
