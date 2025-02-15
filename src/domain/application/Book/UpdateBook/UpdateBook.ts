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
      update_fields: updateData,
    });
    if (!bookUpdated) {
      throw new InternalError();
    }

    return [new BookOutputBoundary(bookUpdated)];
  }
}
