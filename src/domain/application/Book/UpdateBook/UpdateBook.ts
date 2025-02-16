import InputBoundary from "@/domain/application/InputBoundary";
import OutputBoundary from "@/domain/application/OutputBoundary";
import UseCase from "@/domain/application/UseCase";
import Repository from "@/domain/core/Repository";
import BookOutputBoundary from "../BookOutputBoundary";
import {
  DBOutputBookData,
  InputBookUpdate,
} from "@/domain/application/@types/BookTypes";
import EntityNotFoundError from "../../Errors/EntityNotFoundError";
import InternalError from "../../Errors/InternalError";

export default class UpdateBook
  implements UseCase<InputBookUpdate, DBOutputBookData>
{
  constructor(readonly repository: Repository) {}

  private updateFieldsAssembler(
    dbBook: DBOutputBookData,
    reqUpdateField: Omit<InputBookUpdate, "id">,
  ) {
    const updateFields = {
      title: reqUpdateField.title ?? dbBook.title,
      author: reqUpdateField.author ?? dbBook.author,
      edition: reqUpdateField.edition ?? dbBook.edition,
      publication_year:
        reqUpdateField.publication_year ?? dbBook.publication_year,
      publisher: reqUpdateField.publisher ?? dbBook.publisher,
      publication_location:
        reqUpdateField.publication_location ?? dbBook.publication_location,
      isbn: reqUpdateField.isbn ?? dbBook.isbn,
      volume: reqUpdateField.volume ?? dbBook.volume,
      genre: reqUpdateField.genre ?? dbBook.genre,
    };
    return updateFields;
  }

  async execute(
    inputData: InputBoundary<InputBookUpdate>,
  ): Promise<OutputBoundary<DBOutputBookData>[]> {
    const { id, ...updateData } = inputData.get();

    const dbBook: DBOutputBookData | null = await this.repository.getOne({
      _id: id,
    });
    if (!dbBook) {
      throw new EntityNotFoundError("Book");
    }

    const bookUpdated: DBOutputBookData | null = await this.repository.update({
      query: { _id: id },
      update_fields: this.updateFieldsAssembler(dbBook, updateData),
    });
    if (!bookUpdated) {
      throw new InternalError();
    }

    return [new BookOutputBoundary(bookUpdated)];
  }
}
