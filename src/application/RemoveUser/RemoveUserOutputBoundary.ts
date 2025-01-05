import UserStatus from "@/core/UserStatus";
import OutputBoundary from "../OutputBoundary";

type InputParams = {
  id: string;
  status: string;
  username: string;
  password: string;
  access_level: string;
  created_at?: Date;
  updated_at?: Date;
};

export default class RemoveUserOutputBoundary
  implements OutputBoundary<boolean>
{
  constructor(private readonly data: InputParams) {}

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

  get(): boolean {
    const userStatusCorresponding = this.define(
      UserStatus,
      this.data.status,
      "User status",
    );
    return userStatusCorresponding === UserStatus.TO_DELETE;
  }
}
