import { DBOutputUserData } from "@/domain/application/@types/UserTypes";
import Presenter from "../../interfaces/Presenter";

export default class UserPresenter implements Presenter {
  output<T>(data: T): object {
    const { _id: id, username, access_level } = data as DBOutputUserData;
    return {
      id,
      username,
      access_level,
    };
  }
}
