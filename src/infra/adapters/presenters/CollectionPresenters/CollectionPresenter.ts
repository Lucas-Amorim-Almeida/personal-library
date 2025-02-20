import { DBOutputCollectionData } from "@/domain/application/@types/CollectionTypes";
import Presenter from "../../interfaces/Presenter";

export default class CollectionPresenter implements Presenter {
  output<T>(data: T): object {
    return data as DBOutputCollectionData;
  }
}
