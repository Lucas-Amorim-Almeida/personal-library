import User from "@/core/User";
import OutputBoundary from "../../OutputBoundary";
import AccessLevel from "@/core/AccessLevel";
import UserStatus from "@/core/UserStatus";
import Utils from "@/application/Utils";
import { DBOutputUserData } from "@/application/@types/applicationTypes";

export default class UserStatusUpdateOutputBoundary
  implements OutputBoundary<User>
{
  private user: User;
  constructor(data: DBOutputUserData) {
    const {
      id,
      username,
      password,
      access_level,
      status,
      created_at,
      updated_at,
    } = data;

    this.user = new User({
      username,
      password,
      access_level: Utils.define(AccessLevel, access_level, "Access level"),
      created_at,
      updated_at,
    });
    this.user.setId(id);
    this.user.setStatus(Utils.define(UserStatus, status, "User status"));
  }

  get(): User {
    return this.user;
  }
}
