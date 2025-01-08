import User from "@/core/User";
import OutputBoundary from "../../OutputBoundary";
import AccessLevel from "@/core/AccessLevel";
import UserStatus from "@/core/UserStatus";
import Utils from "@/application/Utils";
import { DBOutputUserData } from "@/application/@types/applicationTypes";

export default class ChangePasswordOutputBoundary
  implements OutputBoundary<User>
{
  private user: User;

  constructor(data: DBOutputUserData) {
    const { username, password, created_at, updated_at, access_level } = data;
    this.user = new User({
      username,
      password,
      access_level: Utils.define(AccessLevel, access_level, "Access level"),
      created_at,
      updated_at,
    });
    this.user.setId(data.id);
    this.user.setStatus(Utils.define(UserStatus, data.status, "User status"));
  }

  get(): User {
    return this.user;
  }
}
