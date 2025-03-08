import { model, Schema } from "mongoose";
import IBook from "../interfaces/IBook";
import BookGenre from "@/domain/core/BookGenre";

export default class BookModel {
  private static schema: Schema<IBook> = new Schema<IBook>(
    {
      title: { type: String, required: true },
      author: { type: [String], required: true },
      edition: { type: String, required: true },
      publication_year: { type: Number, required: true },
      publisher: { type: String, required: true },
      publication_location: { type: String, required: true },
      isbn: { type: String },
      volume: { type: Number },
      genre: { type: [String], enum: Object.values(BookGenre), required: true },
      inserted_by: { type: String, required: true },
    },
    { timestamps: true },
  );

  static getModel() {
    return model<IBook>("Book", this.schema);
  }
}
