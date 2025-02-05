import { CollectionParamsType } from "./@types/types";
import Book from "./Book";
import CollectionIdError from "./Errors/CollectionErrors/CollectionIdError";
import ReadingStatus from "./ReadingStatus";

type CollectionData = {
  id?: string;
  title: string;
  description: string;
  visibiliy: "public" | "private";
  collection: { book: Book; status: ReadingStatus }[];
  owner: string;
  created_at?: Date;
  updated_at?: Date;
};

export default class Collection {
  private id?: string;
  private title: string;
  private description: string;
  private visibility: "public" | "private";
  private collection: { book: Book; status: ReadingStatus }[];
  private owner: string; //user_id
  private created_at?: Date;
  private updated_at?: Date;

  constructor(collectionData: CollectionParamsType) {
    this.title = collectionData.title;
    this.description = collectionData.description;
    this.visibility = collectionData.visibility;
    this.collection = collectionData.collection;
    this.owner = collectionData.owner;
    this.created_at = collectionData.created_at;
    this.updated_at = collectionData.updated_at;
  }

  setId(id: string): void {
    if (!id) {
      throw new CollectionIdError();
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
        visibility: this.visibility,
        collection: this.collection,
        owner: this.owner,
        created_at: this.created_at,
        updated_at: this.updated_at,
        //eslint-disable-next-line
      }).filter(([_, value]) => value !== undefined),
    ) as CollectionData;
    return collectionData;
  }
}
