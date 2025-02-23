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

  private async fetchBookToInsert(
    collection: CollectionBookFromRequest[],
    existingBooks: Map<string, DBCollectionBook>,
  ): Promise<
    Array<{
      book_id: string;
      title: string;
      author: string[];
      status: string;
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

  private mapBookToUpdate(
    collection: CollectionBookFromRequest[],
    dbCollection: DBCollectionBook[],
  ) {
    const incomingMap = new Map(collection.map((book) => [book.book_id, book]));

    return new Map(
      dbCollection
        .filter(
          (book) =>
            incomingMap.has(book.book_id) &&
            incomingMap.get(book.book_id)?.operation === "update",
        )
        .map((book) => {
          const statusOfUpdate =
            incomingMap.get(book.book_id)?.status ?? ReadingStatus.PENDING;

          return [book.book_id, statusOfUpdate];
        }),
    );
  }

  private extractBookToRemove(
    collection: CollectionBookFromRequest[],
    existingBooks: Map<string, DBCollectionBook>,
  ) {
    return collection
      .filter(
        (book) =>
          existingBooks.has(book.book_id) && book.operation === "remove",
      )
      .map((book) => book.book_id);
  }

  private async updateFieldAssembler(
    dbCollection: DBOutputCollectionData,
    books_collection: CollectionBookFromRequest[],
  ) {
    let booksCollection = dbCollection.books_collection;

    const existingBooks = new Map(
      booksCollection.map((book) => [book.book_id, book]),
    );

    const [toInsert, toRemove, toUpdate] = await Promise.all([
      await this.fetchBookToInsert(books_collection, existingBooks),
      this.extractBookToRemove(books_collection, existingBooks),
      this.mapBookToUpdate(books_collection, dbCollection.books_collection),
    ]);

    booksCollection = booksCollection
      .filter((book) => !toRemove.includes(book.book_id))
      .map((book) => ({
        book_id: book.book_id,
        title: book.title,
        author: book.author,
        status: toUpdate.has(book.book_id)
          ? (toUpdate.get(book.book_id) as string)
          : book.status,
      }))
      .concat(toInsert);

    return booksCollection;
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

    const booksCollection = await this.updateFieldAssembler(
      dbCollection,
      books_collection,
    );

    const updatedCollection: DBOutputCollectionData | null =
      await this.repository.update({
        query: { _id: id },
        update_fields: {
          books_collection: booksCollection,
        },
      });

    if (!updatedCollection) {
      throw new InternalError();
    }

    return [new CollectionOutputBoundary(updatedCollection)];
  }
}
