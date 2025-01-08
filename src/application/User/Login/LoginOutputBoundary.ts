import User from "@/core/User";
import OutputBoundary from "../../OutputBoundary";
import UserStatus from "@/core/UserStatus";
import AccessLevel from "@/core/AccessLevel";
import Utils from "@/application/Utils";
import { DBOutputUserData } from "@/application/@types/applicationTypes";

export default class LoginOutputBoundary implements OutputBoundary<User> {
  private user: User;

  constructor(data: DBOutputUserData) {
    const {
      id,
      status,
      username,
      password,
      access_level,
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
