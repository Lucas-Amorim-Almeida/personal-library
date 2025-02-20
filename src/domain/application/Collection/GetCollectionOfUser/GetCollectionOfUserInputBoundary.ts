import InputBoundary from "@/domain/application/InputBoundary";
import InvalidFieldError from "../../Errors/InvalidFieldError";

export default class GetCollectionOfUserInputBoundary
  implements InputBoundary<{ user_id: string }>
{
  constructor(readonly user: { user_id: string }) {
    if (!user.user_id) {
      throw new InvalidFieldError("User id");
    }
  }

  get(): { user_id: string } {
    return this.user;
  }
}
