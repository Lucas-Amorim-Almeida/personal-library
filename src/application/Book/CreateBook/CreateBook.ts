import { DBOutputBookData } from "@/application/@types/applicationTypes";
import InputBoundary from "@/application/InputBoundary";
import OutputBoundary from "@/application/OutputBoundary";
import UseCase from "@/application/UseCase";
import Book from "@/core/Book";
import Repository from "@/core/Repository";
import CreateBookOutputBoundary from "./CreateBookOutputBoundary";

export default class CreateBook
  implements UseCase<{ user_id: string; book: Book }, Book>
{
  constructor(readonly repository: Repository) {}

  async execute(
    inputData: InputBoundary<{ user_id: string; book: Book }>,
  ): Promise<OutputBoundary<Book>> {
    const { user_id, book } = inputData.get();

    const dbUser: DBOutputBookData | null = await this.repository.getOne({
      id: user_id,
    });
    if (!dbUser) {
      throw new Error("User not found.");
    }

    const createdBook: DBOutputBookData | null = await this.repository.save({
      id: user_id,
      book,
    });
    if (!createdBook) {
      throw new Error("An internal server error occurred.");
    }

    return new CreateBookOutputBoundary(createdBook);
  }
}
