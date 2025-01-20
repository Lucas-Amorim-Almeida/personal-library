import {
  ColletionInputData,
  DBOutputBookData,
  DBOutputCollectionData,
  DBOutputUserData,
} from "@/application/@types/applicationTypes";
import BookOutputBoundary from "@/application/Book/BookOutputBoundary";
import InputBoundary from "@/application/InputBoundary";
import OutputBoundary from "@/application/OutputBoundary";
import UseCase from "@/application/UseCase";
import Book from "@/core/Book";
import Collection from "@/core/Collection";
import Repository from "@/core/Repository";
import CreateCollectionOutputBoundary from "./CreateCollectionOutputBoundary";

export default class CreateCollection
  implements UseCase<ColletionInputData, DBOutputCollectionData>
{
  constructor(
    readonly userRepository: Repository,
    readonly bookRepository: Repository,
    readonly repository: Repository,
  ) {}

  async execute(
    inputData: InputBoundary<ColletionInputData>,
  ): Promise<OutputBoundary<DBOutputCollectionData>> {
    const { owner, title, description, visibility, collection } =
      inputData.get();

    const dbOwner: DBOutputUserData | null = await this.userRepository.getOne({
      id: owner,
    });
    if (!dbOwner) {
      throw new Error("User not found.");
    }

    const books: Book[] = await Promise.all(
      collection.map(async (bookId) => {
        const dbBook: DBOutputBookData | null =
          await this.bookRepository.getOne({ id: bookId });
        if (!dbBook) {
          throw new Error("Book not found.");
        }
        return new BookOutputBoundary(dbBook).get();
      }),
    );

    const newCollection = new Collection({
      title,
      description,
      visibility,
      collection: books,
      owner,
    });
    const dbCollection: DBOutputCollectionData | null =
      await this.repository.save(newCollection);
    if (!dbCollection) {
      throw new Error("An internal server error occurred.");
    }

    return new CreateCollectionOutputBoundary(dbCollection);
  }
}
