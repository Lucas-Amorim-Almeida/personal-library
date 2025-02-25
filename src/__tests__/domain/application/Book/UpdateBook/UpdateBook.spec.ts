import { repositoryMock } from "@/__tests__/__mocks__/mocks";
import { InputBookUpdate } from "@/domain/application/@types/BookTypes";
import BookOutputBoundary from "@/domain/application/Book/BookOutputBoundary";
import UpdateBook from "@/domain/application/Book/UpdateBook/UpdateBook";
import InternalError from "@/domain/application/Errors/InternalError";
import EntityNotFoundError from "@/domain/application/Errors/EntityNotFoundError";
import InputBoundary from "@/domain/application/InputBoundary";
import BookGenre from "@/domain/core/BookGenre";
import { dbBookExample } from "@/__tests__/__mocks__/bookMock";

const inputParams = {
  id: "id-00001",
  title: "Novo Título",
  author: ["J. R. R. Tolkien"],
  edition: "Coleção Nova Fronteira",
  publication_year: 1954,
  publisher: "Nova Fronteira",
  publication_location: "Rio de Janeiro",
  isbn: "9788520908190",
  volume: 1,
  genre: [BookGenre.FANTASY, BookGenre.CLASSICS],
};

const inputBoundaryMock: jest.Mocked<InputBoundary<InputBookUpdate>> = {
  get: jest.fn(() => inputParams),
};

describe("UpdateBook Use Case", () => {
  let updateBook: UpdateBook;
  beforeEach(() => {
    updateBook = new UpdateBook(repositoryMock);
  });

  it("deve lançar EntityNotFoundError se o livro não for encontrado", async () => {
    repositoryMock.getOne.mockResolvedValue(null);

    await expect(updateBook.execute(inputBoundaryMock)).rejects.toThrow(
      EntityNotFoundError,
    );
  });

  it("deve lançar InternalError se a atualização falhar", async () => {
    repositoryMock.getOne.mockResolvedValue(dbBookExample);
    repositoryMock.update.mockResolvedValue(null);

    await expect(updateBook.execute(inputBoundaryMock)).rejects.toThrow(
      InternalError,
    );
  });

  it("deve atualizar um livro com sucesso", async () => {
    const updatedBookData = { ...dbBookExample, title: "Novo Título" };

    repositoryMock.getOne.mockResolvedValue(dbBookExample);
    repositoryMock.update.mockResolvedValue(updatedBookData);

    const result = await updateBook.execute(inputBoundaryMock);

    expect(result).toEqual([new BookOutputBoundary(updatedBookData)]);
    expect(repositoryMock.getOne).toHaveBeenCalledWith({
      _id: dbBookExample._id,
    });
    expect(repositoryMock.update).toHaveBeenCalledWith({
      query: { _id: dbBookExample._id },
      update_fields: expect.objectContaining({ title: "Novo Título" }),
    });
  });
});
