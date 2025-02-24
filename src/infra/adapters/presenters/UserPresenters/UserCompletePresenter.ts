import { DBOutputUserData } from "@/domain/application/@types/UserTypes";
import Presenter from "../../interfaces/Presenter";

export default class UserCompletePresenter implements Presenter {
  output<T>(data: T): object {
    const {
      _id: id,
      username,
      access_level,
      contact,
      personal_data,
      status,
    } = data as DBOutputUserData;
    return {
      id,
      username,
      access_level,
      contact,
      personal_data,
      status,
    };
  }
}
