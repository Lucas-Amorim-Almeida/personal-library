import UserStatus from "@/domain/core/UserStatus";
import OutputBoundary from "../../OutputBoundary";
import Utils from "@/domain/application/Utils";
import { DBOutputUserData } from "@/domain/application/@types/UserTypes";

export default class RemoveUserOutputBoundary
  implements OutputBoundary<boolean>
{
  constructor(private readonly data: DBOutputUserData) {}

  get(): boolean {
    const userStatusCorresponding = Utils.define(
      UserStatus,
      this.data.status,
      "User status",
    );
    return userStatusCorresponding === UserStatus.TO_DELETE;
  }
}
