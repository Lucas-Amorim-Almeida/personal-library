import InputBoundary from "@/domain/application/InputBoundary";
import Repository from "@/domain/core/Repository";
import OutputBoundary from "@/domain/application/OutputBoundary";
import BookOutputBoundary from "../BookOutputBoundary";
import UseCase from "@/domain/application/UseCase";
import { DBOutputBookData } from "@/domain/application/@types/BookTypes";
import EntityNotFoundError from "../../Errors/EntityNotFoundError";

export default class GetBookById
  implements UseCase<{ id: string }, DBOutputBookData>
{
  constructor(readonly repository: Repository) {}

  async execute(
    inputData: InputBoundary<{ id: string }>,
  ): Promise<OutputBoundary<DBOutputBookData>[]> {
    const { id: _id } = inputData.get();

    const dbBook: DBOutputBookData | null = await this.repository.getOne({
      _id,
    });
    if (!dbBook) {
      throw new EntityNotFoundError("Book");
    }

    return [new BookOutputBoundary(dbBook)];
  }
}
