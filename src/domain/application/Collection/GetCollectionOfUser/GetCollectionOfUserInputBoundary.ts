import InputBoundary from "@/domain/application/InputBoundary";
import InvalidFieldError from "../../Errors/InvalidFieldError";

export default class GetCollectionOfUserInputBoundary
  implements InputBoundary<{ owner: string }>
{
  constructor(readonly user: { user_id: string }) {
    if (!user.user_id) {
      throw new InvalidFieldError("Owner");
    }
  }

  get(): { owner: string } {
    return { owner: this.user.user_id };
  }
}
