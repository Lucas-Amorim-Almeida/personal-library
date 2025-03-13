import InputBoundary from "@/domain/application/InputBoundary";
import InvalidFieldError from "../../Errors/InvalidFieldError";

export default class GetCollectionOfUserInputBoundary
  implements InputBoundary<{ user_id: string; access_private: boolean }>
{
  constructor(readonly user: { user_id: string; access_private: boolean }) {
    if (!user.user_id) {
      throw new InvalidFieldError("User id");
    }
  }

  get(): { user_id: string; access_private: boolean } {
    return this.user;
  }
}
