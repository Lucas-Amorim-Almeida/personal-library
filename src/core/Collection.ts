import { CollectionParamsType } from "./@types/types";
import Book from "./Book";
import User from "./User";

export default class Collection {
  private title: string;
  private description: string;
  private collection: Book[];
  private owner: User;

  constructor(collectionData: CollectionParamsType) {
    this.title = collectionData.title;
    this.description = collectionData.description;
    this.collection = collectionData.collection;
    this.owner = collectionData.owner;
  }

  get(): {
    title: string;
    description: string;
    collection: Book[];
    owner: User;
  } {
    return {
      title: this.title,
      description: this.description,
      collection: this.collection,
      owner: this.owner,
    };
  }
}
