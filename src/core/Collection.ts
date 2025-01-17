import { CollectionParamsType } from "./@types/types";
import Book from "./Book";

type CollectionData = {
  id?: string;
  title: string;
  description: string;
  collection: Book[];
  visibiliy: "public" | "private";
  created_at?: Date;
  updated_at?: Date;
};

export default class Collection {
  private id?: string;
  private title: string;
  private description: string;
  private collection: Book[];
  private visibility: "public" | "private";
  private created_at?: Date;
  private updated_at?: Date;

  constructor(collectionData: CollectionParamsType) {
    this.title = collectionData.title;
    this.description = collectionData.description;
    this.collection = collectionData.collection;
    this.visibility = collectionData.visibility;
    this.created_at = collectionData.created_at;
    this.updated_at = collectionData.updated_at;
  }

  setId(id: string): void {
    if (!id) {
      throw Error("ID is not valid.");
    }
    this.id = id;
  }

  getId(): string | undefined {
    return this.id;
  }

  getVisibility(): "public" | "private" {
    return this.visibility;
  }

  get(): CollectionData {
    const collectionData = Object.fromEntries(
      Object.entries({
        id: this.id,
        title: this.title,
        description: this.description,
        collection: this.collection,
        visibility: this.visibility,
        created_at: this.created_at,
        updated_at: this.updated_at,
        //eslint-disable-next-line
      }).filter(([_, value]) => value !== undefined),
    ) as CollectionData;
    return collectionData;
  }
}
