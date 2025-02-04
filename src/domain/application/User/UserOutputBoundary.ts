import OutputBoundary from "../OutputBoundary";
import { DBOutputUserData } from "../@types/UserTypes";

export default class UserOutputBoundary
  implements OutputBoundary<DBOutputUserData>
{
  private user: DBOutputUserData;
  constructor(data: DBOutputUserData) {
    this.user = data;
  }

  get(): DBOutputUserData {
    return this.user;
  }
}
