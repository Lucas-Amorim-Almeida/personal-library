import InputBoundary from "@/application/InputBoundary";

export default class GetCollectionOfUserInputBoundary
  implements InputBoundary<{ owner: string }>
{
  constructor(readonly user: { user_id: string }) {
    if (!user.user_id) {
      throw new Error("Owner is not valid.");
    }
  }

  get(): { owner: string } {
    return { owner: this.user.user_id };
  }
}
