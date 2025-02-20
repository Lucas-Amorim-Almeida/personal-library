import Repository from "@/domain/core/Repository";
import CollectionModel from "../Models/CollectionModel";
import Collection from "@/domain/core/Collection";

export default class CollectionRepository implements Repository {
  private readonly collectionModel;
  constructor() {
    this.collectionModel = CollectionModel.getModel();
  }

  async save<Input, Output>(data: Input): Promise<Output> {
    const collectionInstanse = data as Collection;
    const collection = collectionInstanse.get();

    const collectionToSave = {
      title: collection.title,
      description: collection.description,
      visibility: collectionInstanse.getVisibility(),
      books_collection: collection.collection.map((item) => ({
        book_id: item.book.getId(),
        title: item.book.getTitle(),
        author: item.book.getAuthor(),
        status: item.status,
      })),
      owner: collection.owner,
    };

    const dbCollection = await this.collectionModel.create(collectionToSave);

    return dbCollection as Output;
  }

  async getOne<Input, Output>(query: Input): Promise<Output | null> {
    const dbCollection = await this.collectionModel.findOne(
      query as { title: string } | { _id: string },
    );

    return dbCollection as Output | null;
  }

  async update<Input, Output>(data: Input): Promise<Output> {
    const { query, update_fields } = data as {
      query: object;
      update_fields: object;
    };

    const updatedCollection = await this.collectionModel.updateOne(
      query,
      update_fields,
    );

    return updatedCollection as Output;
  }

  async delete<Input, Output>(data: Input): Promise<Output> {
    const { _id } = data as { _id: string };
    const deletedCollection = await this.collectionModel.findOneAndDelete({
      _id,
    });
    return deletedCollection as Output;
  }

  async getAll<Output>(): Promise<Output[]> {
    const collections = await this.collectionModel.find();
    return collections as Output[];
  }

  async getMany<Input, Output>(query: Input, take?: number): Promise<Output[]> {
    const queryObject = Object.entries(query as object).reduce(
      (acc, [key, value]) => {
        acc[key] = { $regex: new RegExp(value as string, "i") };
        return acc;
      },
      {} as Record<string, unknown>,
    );

    const collections = take
      ? await this.collectionModel.find(queryObject).limit(take)
      : await this.collectionModel.find(queryObject);
    return collections as Output[];
  }
}
