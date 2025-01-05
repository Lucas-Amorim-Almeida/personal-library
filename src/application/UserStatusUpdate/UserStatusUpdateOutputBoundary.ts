import User from "@/core/User";
import OutputBoundary from "../OutputBoundary";
import AccessLevel from "@/core/AccessLevel";
import UserStatus from "@/core/UserStatus";

type InputParams = {
  id: string;
  status: string;
  username: string;
  password: string;
  access_level: string;
  created_at?: Date;
  updated_at?: Date;
};

export default class UserStatusUpdateOutputBoundary
  implements OutputBoundary<User>
{
  private user: User;
  constructor(data: InputParams) {
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
      access_level: this.define(AccessLevel, access_level, "Access level"),
      created_at,
      updated_at,
    });
    this.user.setId(id);
    this.user.setStatus(this.define(UserStatus, status, "User status"));
  }

  private define<T extends Record<string, string | number>>(
    enumObj: T,
    param: string,
    descriptionn: string,
  ): T[keyof T] {
    const enumValues = Object.values(enumObj) as string[];

    if (!enumValues.includes(param.toUpperCase())) {
      throw new Error(`${descriptionn} is not valid.`);
    }

    const keyOfT = Object.keys(enumObj).find(
      (key) => enumObj[key as keyof T] === param.toUpperCase(),
    );
    if (!keyOfT) {
      throw new Error(`${descriptionn} is not valid.`);
    }

    return enumObj[keyOfT as keyof T];
  }

  get(): User {
    return this.user;
  }
}
