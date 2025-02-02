import { model, Schema } from "mongoose";
import ICollection from "../interfaces/ICollection";
import ReadingStatus from "@/domain/core/ReadingStatus";

export default class CollectionModel {
  private schema: Schema<ICollection>;
  constructor() {
    const collectionSchema = new Schema({
      book_id: { type: String, required: true },
      title: { type: String, required: true },
      author: { type: [String], required: true },
      status: {
        type: String,
        enum: Object.values(ReadingStatus),
        required: true,
      },
    });

    this.schema = new Schema<ICollection>({
      title: { type: String, required: true },
      description: { type: String, required: true },
      visibility: { type: String, enum: ["public", "private"], required: true },
      collection: [collectionSchema],
      owner: { type: String, required: true }, //user_id
    });
  }

  getModel() {
    return (
      model<ICollection>("Collection") ||
      model<ICollection>("Collection", this.schema)
    );
  }
}
