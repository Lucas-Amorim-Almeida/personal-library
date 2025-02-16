import Presenter from "../../interfaces/Presenter";
import { DBOutputBookData } from "@/domain/application/@types/BookTypes";

export default class SimpleInfoBookPresenter implements Presenter {
  output<T>(data: T): object {
    const { _id, title, author, genre, publication_year } =
      data as DBOutputBookData;

    return {
      _id,
      title,
      author,
      genre,
      publication_year,
    };
  }
}
