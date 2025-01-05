import UserStatus from "@/core/UserStatus";
import InputBoundary from "../InputBondary";

export default class UserStatusInputBoundary
  implements InputBoundary<{ id: string; status: UserStatus }>
{
  private readonly id: string;
  private readonly status: UserStatus;

  constructor(inputData: { id: string; status: string }) {
    this.id = inputData.id;
    this.status = this.define(UserStatus, inputData.status, "User status");
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

  get(): { id: string; status: UserStatus } {
    return { id: this.id, status: this.status };
  }
}
