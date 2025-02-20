import { model, Schema } from "mongoose";
import ICollection from "../interfaces/ICollection";
import ReadingStatus from "@/domain/core/ReadingStatus";

export default class CollectionModel {
  private static bookInCollectionSchema = new Schema({
    book_id: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: [String], required: true },
    status: {
      type: String,
      enum: Object.values(ReadingStatus),
      required: true,
    },
  });

  private static schema: Schema<ICollection> = new Schema<ICollection>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    visibility: { type: String, enum: ["public", "private"], required: true },
    books_collection: [this.bookInCollectionSchema],
    owner: { type: String, required: true }, //user_id
  });

  static getModel() {
    return model<ICollection>("BooksCollection", this.schema);
  }
}
