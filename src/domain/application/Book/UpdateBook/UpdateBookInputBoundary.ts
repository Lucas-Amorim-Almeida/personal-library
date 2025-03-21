import InputBoundary from "@/domain/application/InputBoundary";
import Utils from "@/domain/application/Utils";
import BookGenre from "@/domain/core/BookGenre";
import { InputBookUpdate } from "../../@types/BookTypes";
import FieldRequiredError from "../../Errors/FieldRequiredError";

type InputBookUpdateRequestData = {
  id: string;
  title?: string;
  author?: string[];
  edition?: string;
  publication_year?: number;
  publisher?: string;
  publication_location?: string;
  isbn?: string;
  volume?: number;
  genre?: string[];
};
export default class UpdateBookInputBoundary
  implements InputBoundary<InputBookUpdate>
{
  private inputBookData: InputBookUpdate;
  constructor(inputData: InputBookUpdateRequestData) {
    if (Object.keys(inputData).length <= 1) {
      throw new FieldRequiredError("At least one of the properties");
    }

    const {
      id,
      title,
      author,
      edition,
      publication_year,
      publisher,
      publication_location,
      isbn,
      volume,
      genre,
    } = inputData;

    const inputUpdates = Object.fromEntries(
      Object.entries({
        title,
        author,
        edition,
        publication_year,
        publisher,
        publication_location,
        isbn,
        volume,
        genre: genre?.map((item) =>
          Utils.define(BookGenre, item, "Book genre"),
        ),
        //eslint-disable-next-line
      }).filter(([_, value]) => value !== undefined),
    );
    this.inputBookData = { id, ...inputUpdates };
  }

  get(): InputBookUpdate {
    return this.inputBookData;
  }
}
