import { UserParamsType } from "@/core/@types/types";
import User from "@/core/User";
import OutputBoundary from "../OutputBoundary";

export default class CreateUserOutputBoundary implements OutputBoundary<User> {
  private user: User;
  constructor(data: UserParamsType & { id: string }) {
    const { id, ...userData } = data;

    this.user = new User(userData);
    this.user.setId(id);
  }

  get(): User {
    return this.user;
  }
}
