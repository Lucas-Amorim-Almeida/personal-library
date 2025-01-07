import UserStatus from "@/core/UserStatus";
import InputBoundary from "../../InputBoundary";
import Utils from "@/application/Utils";

export default class UserStatusInputBoundary
  implements InputBoundary<{ id: string; status: UserStatus }>
{
  private readonly id: string;
  private readonly status: UserStatus;

  constructor(inputData: { id: string; status: string }) {
    this.id = inputData.id;
    this.status = Utils.define(UserStatus, inputData.status, "User status");
  }

  get(): { id: string; status: UserStatus } {
    return { id: this.id, status: this.status };
  }
}
