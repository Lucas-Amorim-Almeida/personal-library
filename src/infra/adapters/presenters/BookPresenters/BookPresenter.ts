import Presenter from "../../interfaces/Presenter";
import { DBOutputBookData } from "@/domain/application/@types/BookTypes";

export default class BookPresenter implements Presenter {
  output<T>(data: T): object {
    return data as DBOutputBookData;
  }
}
