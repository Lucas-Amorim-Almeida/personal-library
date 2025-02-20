import {
  DBCollectionBook,
  CollectionBookFromRequest,
  CollectionInput,
  DBOutputCollectionData,
} from "@/domain/application/@types/CollectionTypes";
import InputBoundary from "@/domain/application/InputBoundary";
import OutputBoundary from "@/domain/application/OutputBoundary";
import UseCase from "@/domain/application/UseCase";
import ReadingStatus from "@/domain/core/ReadingStatus";
import Repository from "@/domain/core/Repository";
import CollectionOutputBoundary from "../CollectionOutputBoundary";
import { DBOutputBookData } from "@/domain/application/@types/BookTypes";
import EntityNotFoundError from "../../Errors/EntityNotFoundError";
import InternalError from "../../Errors/InternalError";

export default class UpdateBookInCollection
  implements UseCase<CollectionInput, DBOutputCollectionData>
{
  constructor(
    readonly repository: Repository,
    readonly bookRepository: Repository,
  ) {}

  private async listBookToInsert(
    collection: CollectionBookFromRequest[],
    existingBooks: Map<string, DBCollectionBook>,
  ): Promise<
    Array<{
      book_id: string;
      title: string;
      author: string[];
      status: ReadingStatus;
    }>
  > {
    const toInsert = collection.filter(
      (book) => !existingBooks.has(book.book_id) && book.operation === "insert",
    );

    const booksToInsert = await Promise.all(
      toInsert.map(async ({ book_id, status }) => {
        const dbBook: DBOutputBookData | null =
          await this.bookRepository.getOne({
            _id: book_id,
          });

        if (!dbBook) {
          throw new EntityNotFoundError("Book");
        }

        return {
          book_id: dbBook._id,
          title: dbBook.title,
          author: dbBook.author,
          status: status ?? ReadingStatus.PENDING,
        };
      }),
    );

    return booksToInsert;
  }

  private listBookToUpdate(
    collection: CollectionBookFromRequest[],
    dbCollection: DBCollectionBook[],
  ) {
    const incomingMap = new Map(collection.map((book) => [book.book_id, book]));

    const toUpdate = dbCollection.filter(
      (book) =>
        incomingMap.has(book.book_id) &&
        incomingMap.get(book.book_id)?.operation === "update",
    );

    const bookUpdated = toUpdate.map((book) => {
      const statusOfUpdate =
        incomingMap.get(book.book_id)?.status ?? ReadingStatus.PENDING;

      return {
        book_id: book.book_id,
        status: statusOfUpdate,
      };
    });

    return bookUpdated;
  }

  private listBookToRemove(
    collection: CollectionBookFromRequest[],
    existingBooks: Map<string, DBCollectionBook>,
  ) {
    const toRemove = collection.filter(
      (book) => existingBooks.has(book.book_id) && book.operation === "remove",
    );

    const booksToRemove = toRemove.map((book) => book.book_id);
    return booksToRemove;
  }

  async execute(
    inputData: InputBoundary<CollectionInput>,
  ): Promise<OutputBoundary<DBOutputCollectionData>[]> {
    const { id, books_collection } = inputData.get();

    const dbCollection: DBOutputCollectionData | null =
      await this.repository.getOne({ _id: id });
    if (!dbCollection) {
      throw new EntityNotFoundError("Collection");
    }

    const collectionInDB = dbCollection.books_collection;

    const existingBooks = new Map(
      collectionInDB.map((book) => [book.book_id, book]),
    );

    const toInsert = await this.listBookToInsert(
      books_collection,
      existingBooks,
    );

    const toRemove = this.listBookToRemove(books_collection, existingBooks);

    const toUpdate = this.listBookToUpdate(
      books_collection,
      dbCollection.books_collection,
    );

    const updatedCollection: DBOutputCollectionData | null =
      await this.repository.update({
        id,
        update: {
          toRemove,
          toUpdate,
          toInsert,
        },
      });

    if (!updatedCollection) {
      throw new InternalError();
    }

    return [new CollectionOutputBoundary(updatedCollection)];
  }
}
