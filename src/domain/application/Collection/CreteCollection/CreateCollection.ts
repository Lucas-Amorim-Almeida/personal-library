import BookOutputBoundary from "@/domain/application/Book/BookOutputBoundary";
import InputBoundary from "@/domain/application/InputBoundary";
import OutputBoundary from "@/domain/application/OutputBoundary";
import UseCase from "@/domain/application/UseCase";
import Book from "@/domain/core/Book";
import Collection from "@/domain/core/Collection";
import Repository from "@/domain/core/Repository";
import CollectionOutputBoundary from "../CollectionOutputBoundary";
import ReadingStatus from "@/domain/core/ReadingStatus";
import Utils from "@/domain/application/Utils";
import {
  ColletionInputData,
  DBOutputCollectionData,
} from "@/domain/application/@types/CollectionTypes";
import { DBOutputUserData } from "@/domain/application/@types/UserTypes";
import { DBOutputBookData } from "@/domain/application/@types/BookTypes";
import EntityNotFoundError from "../../Errors/EntityNotFoundError";
import InternalError from "../../Errors/InternalError";

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
  ): Promise<OutputBoundary<DBOutputCollectionData>[]> {
    const { owner, title, description, visibility, collection } =
      inputData.get();

    const dbOwner: DBOutputUserData | null = await this.userRepository.getOne({
      id: owner,
    });
    if (!dbOwner) {
      throw new EntityNotFoundError("User");
    }

    const books: { book: Book; status: ReadingStatus }[] = await Promise.all(
      collection.map(async (item) => {
        const dbBook: DBOutputBookData | null =
          await this.bookRepository.getOne({ id: item.book_id });
        if (!dbBook) {
          throw new EntityNotFoundError("Book");
        }
        return {
          book: new BookOutputBoundary(dbBook).get(),
          status: Utils.define(ReadingStatus, item.status, "Reading status"),
        };
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
      throw new InternalError();
    }

    return [new CollectionOutputBoundary(dbCollection)];
  }
}
