import { UserParamsType } from "@/domain/core/@types/types";
import User from "@/domain/core/User";
import OutputBoundary from "../OutputBoundary";
import UserStatus from "@/domain/core/UserStatus";
import AccessLevel from "@/domain/core/AccessLevel";
import Utils from "@/domain/application/Utils";
import { DBOutputUserData } from "../@types/UserTypes";

export default class UserOutputBoundary implements OutputBoundary<User> {
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
    } as UserParamsType);

    this.user.setId(id);
    this.user.setStatus(Utils.define(UserStatus, status, "User status"));
  }

  get(): User {
    return this.user;
  }
}
