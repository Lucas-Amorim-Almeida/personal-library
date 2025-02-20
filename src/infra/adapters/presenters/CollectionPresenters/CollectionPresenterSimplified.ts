import { DBOutputCollectionData } from "@/domain/application/@types/CollectionTypes";
import Presenter from "../../interfaces/Presenter";

export default class CollectionPresenterSimplified implements Presenter {
  output<T>(data: T): object {
    const collection = data as DBOutputCollectionData;

    return {
      _id: collection._id,
      title: collection.title,
      visibility: collection.visibility,
    };
  }
}
