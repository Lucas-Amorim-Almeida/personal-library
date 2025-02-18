import Repository from "@/domain/core/Repository";
import BookModel from "../Models/BookModel";
import Book from "@/domain/core/Book";

export default class BookRepository implements Repository {
  private readonly bookModel;
  constructor() {
    this.bookModel = BookModel.getModel();
  }

  async save<Input, Output>(data: Input): Promise<Output> {
    const book = data as Book;

    const dbBook = await this.bookModel.create(book.get());

    return dbBook as Output;
  }

  async getOne<Input, Output>(query: Input): Promise<Output | null> {
    const dbBook = await this.bookModel.findOne(
      query as { title: string } | { _id: string },
    );

    return dbBook as Output | null;
  }

  async update<Input, Output>(data: Input): Promise<Output> {
    const { query, update_fields } = data as {
      query: object;
      update_fields: object;
    };

    const updatedBook = await this.bookModel.updateOne(query, update_fields);

    return updatedBook as Output;
  }

  async delete<Input, Output>(data: Input): Promise<Output> {
    const { _id } = data as { _id: string };
    const deleteBook = await this.bookModel.findOneAndDelete({ _id });
    return deleteBook as Output;
  }

  async getAll<Output>(): Promise<Output[]> {
    const books = await this.bookModel.find();
    return books as Output[];
  }

  async getMany<Input, Output>(query: Input, take?: number): Promise<Output[]> {
    const queryObject = Object.entries(query as object).reduce(
      (acc, [key, value]) => {
        acc[key] = { $regex: new RegExp(value as string, "i") };
        return acc;
      },
      {} as Record<string, unknown>,
    );

    const books = take
      ? await this.bookModel.find(queryObject).limit(take)
      : await this.bookModel.find(queryObject);
    return books as Output[];
  }
}
