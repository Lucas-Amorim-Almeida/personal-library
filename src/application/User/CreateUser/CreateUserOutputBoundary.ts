import { UserParamsType } from "@/core/@types/types";
import User from "@/core/User";
import OutputBoundary from "../../OutputBoundary";
import UserStatus from "@/core/UserStatus";
import AccessLevel from "@/core/AccessLevel";
import Utils from "@/application/Utils";
import { DBOutputUserData } from "@/application/@types/applicationTypes";

export default class CreateUserOutputBoundary implements OutputBoundary<User> {
  private user: User;
  constructor(data: DBOutputUserData) {
    const { id, status, username, password, access_level } = data;

    this.user = new User({
      username,
      password,
      access_level: Utils.define(AccessLevel, access_level, "Access level"),
    } as UserParamsType);

    this.user.setId(id);
    this.user.setStatus(Utils.define(UserStatus, status, "User status"));
  }

  get(): User {
    return this.user;
  }
}
